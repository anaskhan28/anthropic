'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css';
interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

interface ChatProps {
  messages: Message[];
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}



export function Chat({ messages, input, handleInputChange, handleSubmit }: ChatProps) {
  const [files, SetFiles] = useState([])



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
               <FilePond
        files={files}
        onupdatefiles={SetFiles}
        allowMultiple={true}
        maxFiles={3}
        server="http://192.168.1.105:5000/extract"
        name="files" 
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
            </button>
         
            
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
}