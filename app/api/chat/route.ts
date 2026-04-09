import { createClient } from '@supabase/supabase-js';
import { CohereClient } from 'cohere-ai';
import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

// Define Types for strictness
type DocumentChunk = {
  id: number;
  content: string;
  metadata: { 
    source: string; 
    date: string; 
    title: string 
  };
  similarity: number;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Acknowledged: Admin key for prototype only
);

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. INPUT VALIDATION GUARD
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content;

    // 2. EMBED QUERY (inputType: 'search_query' is correct for Cohere v3)
    const embed = await cohere.embed({
      texts: [lastMessage],
      model: 'embed-english-v3.0',
      inputType: 'search_query', 
    });

    // Cast 'embed.embeddings' so TypeScript knows it's a list of number arrays
    const embeddings = embed.embeddings as number[][];
    const queryEmbedding = embeddings[0];

    // 3. VECTOR SEARCH 
    const { data: documents, error: matchError } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.3, // Lowered to 0.3 for better conversational matching
      match_count: 5,
    }) as { data: DocumentChunk[] | null, error: any };

    if (matchError) throw matchError;

    // 4. FORMAT CONTEXT WITH METADATA (Safe even if documents is null/empty)
    const contextText = documents && documents.length > 0
      ? documents.map((doc) => `[SOURCE: ${doc.metadata.source} (${doc.metadata.date})]\n${doc.content}`).join('\n\n---\n\n')
      : "No relevant verified context found in the database.";

    // 5. SYSTEM PROMPT (Updated with Triangulation & Neutrality Defense)
    const systemPrompt = `
    You are TruthLens AI, a defensive pedagogical tool designed to combat Philippine misinformation.

    YOUR IDENTITY & CAPABILITIES:
    - You were built as an academic prototype to educate users on identifying deepfakes, disinformation, and troll farms in the Philippines.
    - Your knowledge base relies strictly on verified fact-checks from a triangulated consortium of sources: UP Tsek.ph, VERA Files, GMA News, Rappler, and academic papers (like Ong & Cabañes or Citron & Chesney).
    - If a user asks "What do you know?", "What can you do?", or "Who are you?", explain your purpose directly and suggest they ask you about "deepfakes", "troll farms", or "the Ramon Ang audio deepfake".
    - If asked about specific sources (e.g., "What is VERA Files?" or "What is Tsek.ph?"), explain that they are independent, verified Philippine news and academic fact-checking organizations.
    - If a user questions your neutrality or bias, explain that you cross-reference multiple independent, university-backed, and mainstream journalistic organizations to ensure objective accuracy.

    STRICT GUARDRAILS:
    1. EXCEPTION FOR IDENTITY: You are allowed to answer greetings ("hello") or questions about your identity and capabilities (e.g., "what can you do?") using the IDENTITY instructions above. You do NOT need retrieved context for this.
    2. FACTUAL QUERIES MUST USE CONTEXT: For questions about real-world claims, news events, concepts, or people, you MUST use ONLY the retrieved context provided below.
    3. THE REFUSAL RULE: If the user asks about a specific real-world topic and the answer is NOT in the retrieved context, you MUST explicitly state: "I'm sorry, but my current knowledge base does not contain verified information to answer that specific query." Do NOT hallucinate, guess, or use outside knowledge.
    4. CITE SOURCES: Always cite your source at the end of factual answers (e.g., Source: VERA Files 2024).

    RETRIEVED CONTEXT:
    ${contextText}
    `;

    // 6. GROQ INFERENCE (Temperature 0.1 for maximum groundedness)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: lastMessage } // Stateless RAG pattern
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1, 
      max_tokens: 800,
      stream: true,
    });

    // 7. CONVERT TO WEB STREAM
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

    // Return the stream directly to the frontend
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });

  } catch (error: any) {
    console.error('CRITICAL CHAT ERROR:', error.message);
    return NextResponse.json({ error: 'System error. Check terminal logs.' }, { status: 500 });
  }
}