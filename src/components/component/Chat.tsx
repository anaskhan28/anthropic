'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import axios from 'axios'
import { json } from "stream/consumers"
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ChatProps {
  messages: Message[];
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}



export function Chat({ messages, input, handleInputChange, handleSubmit }: ChatProps) {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageAPI, setImageAPI] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const dataHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        const isImage = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
        setImageAPI(isImage);
        formData.append(`${isImage ? 'image' : 'document'}`, file);
      }
  
      const res = await axios.post<any>(`http://192.168.1.105:5000/${imageAPI ? 'image' : 'extract'}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setResponse(res.data);
      const data = JSON.stringify(response);
      console.log(data, 'data')
      localStorage.setItem('invoice', data );
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const textContent =
  imageAPI &&
  response &&
  response.content &&
  response.content.length > 0
    ? response.content[0].text.match(/TextBlock\(text='(.*?)'/)?.[1] || ''
    : 'no output';

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-4">
          {messages.map((m, index) => (
            <div key={index} className={index % 2 === 0 ? "flex justify-end" : "flex"}>
              <div className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 px-4 py-2 rounded-lg max-w-[75%] md:max-w-[50%]" : "bg-blue-500 text-white px-4 py-2 rounded-lg max-w-[75%] md:max-w-[50%]"}>
                <p>{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className="border-t dark:border-gray-800 p-4 md:p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <Input className="flex-1 mr-2" placeholder="Type your message..." type="text" value={input} onChange={handleInputChange} />
            <button className="max-w-36 bg-transparent hover:bg-none cursor-pointer">
            {/* {selectedFile && <img src={selectedFile ? selectedFile : "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" } alt="preview" />}
            <Input placeholder="choose file" className="cursor-pointer" type="file" onClick={handleFileChange}/> */}
            
            
  </button>
         
            
            <Button type="submit">Send</Button>
          </div>
        </form>

        <form onSubmit={dataHandleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>

      </form>
      {response && <pre>{imageAPI ? textContent : JSON.stringify(response, null, 2)}</pre>}
      </div>
    </div>
  );
}