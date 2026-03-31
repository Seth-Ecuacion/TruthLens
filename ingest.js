require('dotenv').config({ path: '.env.local' });
const { CohereClientV2 } = require('cohere-ai');
const { createClient } = require('@supabase/supabase-js');

// Initialize Clients
const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// --- CONFIGURATION ---
const ARTICLE_SOURCE_ID = "module-1-deepfakes"; // Change this for each new blog post

const articleText = `
In recent years, the phrase "seeing is believing" has lost its absolute truth. With the rapid advancement of Artificial Intelligence, a new form of synthetic media has emerged: the deepfake.

A deepfake is a type of artificial intelligence used to create convincing image, audio, and video hoaxes. The term is a portmanteau of "deep learning" and "fake." By training neural networks on massive datasets of a person's face and voice, software can now seamlessly stitch one person's face onto another's body, or generate audio of them saying things they never actually said.

While models are getting better, they still leave behind digital artifacts. When verifying media, look for these common flaws: Unnatural Blinking: Early deepfakes often failed to replicate natural human blinking patterns. Lighting Inconsistencies: Check if the shadows on a person's face match the lighting of the room they are supposedly in. Mismatched Audio: Listen closely to see if the lip movements perfectly sync with the spoken syllables. Blurry Edges: Look at the perimeter of the face and the hair; AI often struggles to render individual hair strands clearly against complex backgrounds.

You don't have to rely purely on the naked eye. There are free, authoritative tools available online to help you verify if an image or piece of news has been manipulated.

Google Fact Check Explorer: Search for topics or specific claims to see if authoritative organizations have already debunked them.
TinEye Reverse Image Search: Upload an image to see where else it has appeared on the internet. Useful for finding the original, unaltered version of a viral photo.
MIT Detect Fakes Project: An interactive research project teaching you the exact visual anomalies to look for in manipulated media.
`;

/**
 * Intelligent Chunking with Overlap
 * Breaks text into chunks of ~maxLength, ensuring words aren't cut in half,
 * and overlapping by ~overlapLength to preserve context.
 */
function chunkText(text, maxLength = 500, overlapLength = 100) {
  const words = text.replace(/\s+/g, ' ').split(' ');
  const chunks = [];
  let currentChunk = [];
  let currentLength = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (currentLength + word.length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
      
      // Keep the last few words for overlap
      let overlapChunk = [];
      let overlapSize = 0;
      for (let j = currentChunk.length - 1; j >= 0; j--) {
        if (overlapSize + currentChunk[j].length > overlapLength) break;
        overlapChunk.unshift(currentChunk[j]);
        overlapSize += currentChunk[j].length + 1;
      }
      
      currentChunk = [...overlapChunk];
      currentLength = overlapSize;
    }
    
    currentChunk.push(word);
    currentLength += word.length + 1; // +1 for the space
  }
  
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }
  
  return chunks;
}


async function runIngestion() {
  try {
    console.log(`Starting ingestion for source: [${ARTICLE_SOURCE_ID}]`);

    // 1. Chunk the text with overlap
    const chunks = chunkText(articleText);
    console.log(`Created ${chunks.length} overlapping chunks.`);

    // 2. Fetch Embeddings
    console.log("Fetching embeddings from Cohere...");
    const embedResponse = await cohere.embed({
      texts: chunks,
      model: 'embed-english-v3.0',
      inputType: 'search_document', 
      embeddingTypes: ['float'],
    });

    const embeddings = embedResponse.embeddings.float;

    // Validation Guard
    if (embeddings.length !== chunks.length) {
      throw new Error(`CRITICAL: Cohere returned ${embeddings.length} vectors for ${chunks.length} chunks.`);
    }

    // 3. Prevent Duplicates: Clear old chunks for this specific article
    console.log(`Clearing existing chunks for [${ARTICLE_SOURCE_ID}]...`);
    const { error: deleteError } = await supabase
      .from('blog_chunks')
      .delete()
      .eq('source', ARTICLE_SOURCE_ID);

    if (deleteError) throw deleteError;

    // 4. Prepare and Insert Payload
    const supabasePayload = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
      source: ARTICLE_SOURCE_ID
    }));

    console.log(`Inserting ${supabasePayload.length} fresh chunks into Supabase...`);
    const { error: insertError } = await supabase
      .from('blog_chunks')
      .insert(supabasePayload);

    if (insertError) throw insertError;

    console.log("✅ Ingestion complete. Database is clean and up to date.");

  } catch (error) {
    console.error("❌ Ingestion Failed:", error);
  }
}

runIngestion();