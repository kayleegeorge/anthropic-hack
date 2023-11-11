import { StreamingTextResponse, CohereStream } from 'ai';
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 

// co = cohere.Client('<<apiKey>>')
// response = co.chat(
//   chat_history=[
//     {"role": "USER", "message": "Who discovered gravity?"},
//     {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}
//   ],
//   message="What year was he born?",
//   connectors=[{"id": "web-search"}] # perform web search before answering the question
// )
// print(response)



export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();  
 
  const body = JSON.stringify({
    chat_history: messages,
    prompt: messages[-1],
    model: 'command-nightly',
    max_tokens: 300,
    stop_sequences: [],
    temperature: 0.9,
    return_likelihoods: 'NONE',
    stream: true,
  });
 
  const response = await fetch('https://api.cohere.ai/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    body,
  });
 

  
  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }
 
  // Extract the text response from the Cohere stream
  const stream = CohereStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}