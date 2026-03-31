import { NextResponse } from 'next/server';
import { CohereClientV2 } from 'cohere-ai';
import { createClient } from '@supabase/supabase-js';

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // The sample text we want the AI to know
    const sampleFact = "A deepfake is a type of artificial intelligence used to create convincing image, audio and video hoaxes. The term, which describes both the technology and the resulting bogus content, is a portmanteau of deep learning and fake.";

    // 1. Turn the text into math (Notice inputType is 'search_document' for storing data)
    const embedResponse = await cohere.embed({
      texts: [sampleFact],
      model: 'embed-english-v3.0',
      inputType: 'search_document', 
      embeddingTypes: ['float'],
    });

    const vector = embedResponse.embeddings.float[0];

    // 2. Save it to Supabase
    const { error } = await supabase
      .from('blog_chunks')
      .insert({
        content: sampleFact,
        embedding: vector
      });

    if (error) throw error;

    return NextResponse.json({ success: "Database seeded successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}