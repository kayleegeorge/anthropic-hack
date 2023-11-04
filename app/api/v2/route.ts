import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";

// IMPORTANT: Needed to reduce latency for streaming.
export const runtime = "edge";

// Build a prompt from the messages
function buildPrompt(
  messages: { content: string; role: "system" | "user" | "assistant" }[]
) {
  return (
    messages
      .map(({ content, role }) => {
        if (role === "user") {
          return `Human: ${content}`;
        } else {
          return `Assistant: ${content}`;
        }
      })
      .join("\n\n") + "Assistant:"
  );
}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY ?? "",
    defaultHeaders: { "Access-Control-Allow-Origin": "no-cors" },
  });

  const response = await anthropic.completions.create({
    model: "claude-v1",
    max_tokens_to_sample: 300,
    prompt: buildPrompt(messages),
    stream: true,
  })

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
