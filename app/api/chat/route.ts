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
// 1. Convert the query to an embedding
  const embed = await cohere.embed({
    texts: [lastMessage],
    model: 'embed-english-v3.0',
    inputType: 'search_query', 
  });

  // FIX: Cast 'embed.embeddings' so TypeScript knows it's a list of number arrays
  const embeddings = embed.embeddings as number[][];
  const queryEmbedding = embeddings[0];

    // 3. VECTOR SEARCH (Ensuring vector(1024) matches Supabase schema)
    const { data: documents, error: matchError } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: 5,
    }) as { data: DocumentChunk[] | null, error: any };

    if (matchError) throw matchError;

    // 4. ZERO-MATCH EARLY RETURN (Ensures Transparency)
    if (!documents || documents.length === 0) {
      return NextResponse.json({ 
        role: 'assistant', 
        content: "I'm sorry, but my current knowledge base does not contain verified information to answer that specific query. For the most accurate and up-to-date fact-checks, I recommend consulting VERA Files or Rappler directly." 
      });
    }

    // 5. FORMAT CONTEXT WITH METADATA
    const contextText = documents
      .map((doc) => `[SOURCE: ${doc.metadata.source} (${doc.metadata.date})]\n${doc.content}`)
      .join('\n\n---\n\n');

    // 6. SYSTEM PROMPT (Stateless pattern for Llama 3.3)
    const systemPrompt = `
      You are TruthLens AI, a defensive pedagogical tool for the Philippines.
      
      GUARDRAILS:
      - Use ONLY the context provided below.
      - If the answer isn't in the context, admit you don't know. Do NOT hallucinate.
      - Cite your source at the end (e.g., Source: VERA Files 2024).
      - Maintain a neutral, educational, and journalistic tone.

      CONTEXT:
      ${contextText}
    `;

    // 7. GROQ INFERENCE (Temperature 0.1 for maximum groundedness)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: lastMessage } // Stateless RAG pattern
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1, 
      max_tokens: 800,
    });

    return NextResponse.json({ 
      role: 'assistant', 
      content: chatCompletion.choices[0].message.content 
    });

  } catch (error: any) {
    console.error('CRITICAL CHAT ERROR:', error.message);
    return NextResponse.json({ error: 'System error. Check terminal logs.' }, { status: 500 });
  }
}