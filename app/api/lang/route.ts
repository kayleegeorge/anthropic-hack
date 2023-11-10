import { StreamingTextResponse, LangChainStream } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage } from 'langchain/schema';
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
  const { stream, handlers, writer } = LangChainStream();
 
  const llm = new ChatOpenAI({
    streaming: true,
  });
 
  llm
    .call(
      messages.map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error);
 
  return new StreamingTextResponse(stream);
}