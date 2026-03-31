import { CohereClientV2 } from 'cohere-ai';
import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY! });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const embedResponse = await cohere.embed({
      texts: [message],
      model: 'embed-english-v3.0',
      inputType: 'search_query',
      embeddingTypes: ['float'],
    });
    
    const queryEmbedding = embedResponse.embeddings.float[0];

    const { data: chunks, error } = await supabase.rpc('match_blog_chunks', {
      query_embedding: queryEmbedding,
      match_threshold: 0.3, 
      match_count: 3,       
    });

    if (error) throw error;

    const contextText = chunks?.map((chunk: any) => chunk.content).join('\n\n') || '';

    const systemPrompt = `You are a helpful assistant for a media literacy and cybersecurity blog. 
    Answer the user's question based ONLY on the following context:
    
    ${contextText}
    
    If the answer is not in the context, honestly state that you don't know based on the provided resources.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama-3.1-8b-instant',
      stream: true, 
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of chatCompletion) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      }
    });

    // FIX: Using appropriate content type for raw byte streaming
    return new Response(stream, {
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error("RAG Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}