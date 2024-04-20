import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';
 import json from '@/utils/format.json'
// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, invoice } = await req.json();


  console.log(messages, 'messages')
  const data = invoice;
  console.log(data, 'backend data')

 
  // Ask Claude for a streaming chat completion given the prompt
  const response = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: `${invoice}` }],
    model: 'claude-3-opus-20240229',
    stream: true,
  });
 
  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}