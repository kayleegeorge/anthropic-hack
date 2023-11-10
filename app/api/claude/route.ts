import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";

// IMPORTANT: Needed to reduce latency for streaming.
export const runtime = "edge";

// CLAUDE

// Build a prompt from the messages in claude style
function buildPrompt(
  messages: { content: string; role: "system" | "user" | "assistant" }[] 
) {

  return (
    messages
      .map(({ content, role }) => {
        if (role === "user") {
          return `${Anthropic.HUMAN_PROMPT} ${content}`;
        } else {
          return `${Anthropic.AI_PROMPT} ${content}`;
        }
      })
      .join("\n\n") + `${Anthropic.AI_PROMPT}`
  );
}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY ?? "",
  });
  const prompt = buildPrompt(messages);

  const response = await anthropic.completions.create({
    model: "claude-2",
    max_tokens_to_sample: 300,
    prompt: prompt, 
    stream: true,
  })

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}


