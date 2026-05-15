import { createClient } from '@supabase/supabase-js';
import { CohereClient } from 'cohere-ai';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

/**
 * 1. FAIL FAST: Environment Variable Guard
 * Supports both Next.js standard and backend-only naming.
 */
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const cohereKey = process.env.COHERE_API_KEY;

if (!supabaseUrl || !supabaseKey || !cohereKey) {
  console.error('❌ Missing environment variables. Check your .env.local file for:');
  console.error('- SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  console.error('- COHERE_API_KEY');
  process.exit(1);
}

// Initialize Clients
const supabase = createClient(supabaseUrl, supabaseKey);
const cohere = new CohereClient({ token: cohereKey });

/**
 * 2. DATA SOURCES
 * Mix of real URLs and local text files.
 */
const sources = [
  // --- VERA FILES (Verified Cases & Election Threats) ---
  {
    type: 'url',
    url: 'https://verafiles.org/articles/fact-check-tv-patrol-report-about-ramon-ang-elon-musk-investment-project-is-a-deepfake',
    title: 'Fact Check: TV Patrol report about Ramon Ang, Elon Musk investment project is a DEEPFAKE',
    source: 'VERA Files',
    date: '2024'
  },
  {
    type: 'url',
    url: 'https://verafiles.org/articles/ai-supercharges-scam-production-globally-in-2024',
    title: 'AI supercharges scam production globally in 2024',
    source: 'VERA Files',
    date: '2024'
  },
  {
    type: 'url',
    url: 'https://verafiles.org/articles/deepfakes-ai-generated-disinfo-threaten-2025-polls-veteran-journos-warn',
    title: 'Deepfakes, AI-generated disinfo threaten 2025 polls, veteran journos warn',
    source: 'VERA Files',
    date: '2024'
  },

  // --- RAPPLER (Forensics & Legal Context) ---
  {
    type: 'url',
    url: 'https://www.rappler.com/newsbreak/in-depth/philippines-faces-rising-ai-disinformation-2024/',
    title: 'Philippines faces rising AI-driven disinformation',
    source: 'Rappler',
    date: '2024'
  },
  {
    type: 'url',
    url: 'https://www.rappler.com/philippines/elections/ai-misuse-feared-impact-integrity-polls-what-to-do-2025/',
    title: 'AI misuse feared to impact integrity of 2025 elections',
    source: 'Rappler',
    date: '2024'
  },
  {
    type: 'url',
    url: 'https://www.rappler.com/philippines/elections/lack-legal-teeth-against-online-disinformation-casts-long-shadow-2025/',
    title: 'Lack of legal teeth vs online disinformation casts long shadow over 2025 polls',
    source: 'Rappler',
    date: '2024'
  },

  // --- ACADEMIC FOUNDATIONS (Local Text Files) ---
  {
    type: 'local',
    filepath: './data/citron-chesney-liars-dividend.txt',
    title: 'Deep Fakes: A Looming Challenge for Privacy, Democracy, and National Security',
    source: 'Citron, D. & Chesney, R.',
    date: '2019'
  },
  {
    type: 'local',
    filepath: './data/deepfake-detection.txt', // ADD THIS FILE
    title: 'Deepfake Detection: A Systematic Literature Review',
    source: 'IEEE Access, Vol. 10, pp. 25494–25513 (IEEE)',
    date: '2022'
  },
  {
    type: 'local',
    filepath: './data/survey-automated-fact-checking.txt', // ADD THIS FILE
    title: 'A Survey on Automated Fact-Checking',
    source: 'Transactions of the Association for Computational Linguistics, Vol. 10, pp. 178–206 (MIT Press)',
    date: '2022'
  },
  {
    type: 'local',
    filepath: './data/defining-fake-news.txt', // ADD THIS FILE
    title: 'Defining "Fake News"',
    source: 'Digital Journalism, Vol. 6, No. 2, pp. 137–153 (Taylor & Francis / Routledge)',
    date: '2017'
  },
  {
    type: 'local',
    filepath: './data/deepfakes-and-beyond.txt', // ADD THIS FILE
    title: 'DeepFakes and Beyond: A Survey of Face Manipulation and Fake Detection',
    source: 'Tolosana, R., Vera-Rodriguez, R., Fierrez, J., Morales, A., & Ortega-Garcia, J.',
    date: '2020'
  },
  {
    type: 'local',
    filepath: './data/deepfakes-and-disinformation.txt', // ADD THIS FILE
    title: 'Deepfakes and Disinformation: Exploring the Impact of Synthetic Political Video on Deception, Uncertainty, and Trust in News',
    source: 'Vaccari, C. & Chadwick, A.',
    date: '2020'
  },
  {
    type: 'local',
    filepath: './data/truth-and-false-spread.txt', // ADD THIS FILE
    title: 'The Spread of True and False News Online',
    source: 'Vosoughi, S., Roy, D., & Aral, S.',
    date: '2018'
  },
  {
    type: 'url',
    url: 'https://tsek.ph/ai-fakery-rises-but-cheapfakes-still-rule-the-race/',
    title: 'AI fakery rises, but cheapfakes still rule the race',
    source: 'Tsek.ph',
    date: '2025',
    metadata_notes: 'Documents that out of 35 altered claims during the 2025 election campaign, nearly a third involved deepfake technology.'
  },
  {
    type: 'url',
    url: 'https://www.gmanetwork.com/news/topstories/specialreports/918489/ai-deepfakes-to-figure-more-in-campaign-for-eleksyon-2025-expert/story/',
    title: 'AI, deepfakes to figure more in campaign for Eleksyon 2025',
    source: 'GMA News Online',
    date: '2024'
  },
  {
    type: 'url',
    url: 'https://www.cambridge.org/core/journals/data-and-policy/article/disinformation-by-design-leveraging-solutions-to-combat-misinformation-in-the-philippines-2025-election/81A1C30509A8F53B4B27DB0B25E12E99',
    title: 'Disinformation by design: leveraging solutions to combat misinformation in the Philippines’ 2025 election',
    source: 'Cambridge University Press',
    date: '2025'
  },
  {
    type: 'text',
    content: 'COMELEC Resolution No. 11064 establishes the guidelines on the use of Artificial Intelligence (AI) and deepfakes in the 2025 National and Local Elections. It mandates the disclosure of AI-generated materials used in campaign propaganda to prevent voter deception and protect the integrity of the electoral process.',
    title: 'COMELEC Resolution 11064 - Guidelines on AI use in Elections',
    source: 'Commission on Elections (COMELEC)',
    date: '2024'
  },
  {
    type: 'text',
    content: 'The InVID/WeVerify plugin is a verification tool designed for journalists and fact-checkers. Core methodologies for manual deepfake detection include: 1) Reverse image searching keyframes to find original, unmanipulated source videos. 2) Analyzing file metadata (EXIF) for signs of artificial generation. 3) Forensic analysis of inconsistencies in lighting, shadows, and facial rendering (e.g., unnatural blinking or teeth).',
    title: 'InVID/WeVerify Detection Methodology',
    source: 'InVID Project',
    date: '2024'
  }
];
/**
 * 3. SCRAPING LOGIC
 * Generic paragraph selector with a character-length filter to avoid nav/footer junk.
 */
async function scrapeUrl(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'TruthLens Academic Research Bot (University Project)' }
    });
    
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    let content = '';

    $('p').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 80) {
        content += text + '\n\n';
      }
    });

    return content.trim();
  } catch (error) {
    console.error(`Failed to scrape ${url}. Fallback recommended.`, error.message);
    return null;
  }
}

/**
 * 4. RAG OPTIMIZATION: OVERLAPPING CHUNKS
 * Ensures semantic context is preserved across splits.
 */
function chunkText(text, maxWords = 400, overlap = 100) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += (maxWords - overlap)) {
    chunks.push(words.slice(i, i + maxWords).join(' '));
    if (i + maxWords >= words.length) break;
  }
  return chunks;
}

/**
 * 5. MAIN PIPELINE
 */
async function runIngestion() {
  console.log('🚀 Starting TruthLens Ingestion Pipeline...\n');

  for (const doc of sources) {
    console.log(`Processing: ${doc.title}...`);

    // DEDUPLICATION CHECK: Use JSONB pointer for metadata field title
    const { data: existing, error: checkError } = await supabase
      .from('documents')
      .select('id')
      .eq('metadata->>title', doc.title)
      .limit(1);

    if (checkError) {
      console.error(`  -> ⚠️ Error checking duplicates (Table might not exist?): ${checkError.message}`);
      continue;
    }

    if (existing && existing.length > 0) {
      console.log(`  -> ⏭️  Already ingested. Skipping to prevent redundant data.\n`);
      continue;
    }

    let rawText = '';

    // Content Acquisition
    if (doc.type === 'url') {
      rawText = await scrapeUrl(doc.url);
    } else if (doc.type === 'local') {
      if (fs.existsSync(doc.filepath)) {
        rawText = fs.readFileSync(doc.filepath, 'utf-8');
      } else {
        console.error(`  -> ❌ File not found: ${doc.filepath}\n`);
        continue;
      }
    }

    if (!rawText) continue;

    // Prepend metadata header to chunk for LLM contextual awareness
    const header = `Title: ${doc.title} | Source: ${doc.source} | Date: ${doc.date}\n\n`;
    const fullContent = header + rawText;

    const chunks = chunkText(fullContent);
    console.log(`  -> ✂️  Split into ${chunks.length} overlapping chunks.`);

    // Embedding & Storage
    let successCount = 0;
    for (const [index, chunk] of chunks.entries()) {
      try {
        const embedResponse = await cohere.embed({
          texts: [chunk],
          model: 'embed-english-v3.0',
          inputType: 'search_document', // Required for Cohere v3 Ingestion
        });
        
        // embedResponse.embeddings is an array of number arrays
        const embedding = embedResponse.embeddings[0];

        const { error: insertError } = await supabase.from('documents').insert({
          content: chunk,
          metadata: { title: doc.title, source: doc.source, date: doc.date, chunk_index: index },
          embedding: embedding
        });

        if (insertError) throw insertError;
        successCount++;

        // Respect Cohere Free Tier Rate Limits (approx 5 reqs per minute)
        // If you have a paid key, you can reduce this to 100ms
        await new Promise(resolve => setTimeout(resolve, 300));

      } catch (err) {
        console.error(`  -> ❌ Chunk ${index} failed:`, err.message);
      }
    }
    console.log(`  -> ✅ Successfully ingested ${successCount}/${chunks.length} chunks!\n`);
  }
  
  console.log('🎉 Ingestion Complete! The TruthLens database is ready for the demo.');
}

runIngestion();