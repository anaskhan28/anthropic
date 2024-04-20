import { NextApiRequest, NextApiResponse } from 'next';
import { PythonShell, PythonShellError } from 'python-shell';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Path to the Python script
    const scriptPath = path.join(__dirname, 'script.py');

    // Options for PythonShell
    const options: PythonShell.IPythonShellOptions = {
        mode: 'text',
        pythonPath: '/path/to/python', // Path to Python executable
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: path.dirname(scriptPath),
    };

    // Execute Python script
    PythonShell.run('script.py', options, (err: PythonShellError | null, result?: string[]) => {
        if (err) {
            console.error('Error executing Python script:', err);
            res.status(500).json({ error: 'Error executing Python script' });
        } else {
            console.log('Python script executed successfully');
            res.status(200).json({ result });
        }
    });
}

