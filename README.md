# TruthLens

> **"See Through the Noise."**  
> A pedagogical AI tool for combating deepfakes and disinformation in the Philippine context.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-truth--lens--silk.vercel.app-00C2CB?style=for-the-badge)](https://truth-lens-silk.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-90%25-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## Overview

TruthLens is an academic capstone prototype demonstrating how **Retrieval-Augmented Generation (RAG)** can be deployed defensively to educate Filipino digital citizens about deepfakes, disinformation, and synthetic media. 

It is **not** an automated fact-checker or deepfake detector. It is a guided pedagogical tool — designed to teach users *how* to think critically about media, not to think for them. This distinction is a deliberate ethical choice grounded in the [ACM Code of Ethics](https://www.acm.org/code-of-ethics).

The project was built as a university capstone for a CS/IT program, combining a polished editorial frontend with a functional RAG backend powered by verified Philippine journalistic and academic sources.

---

## Features

- **RAG-powered chatbot** — Answers are grounded exclusively in a curated knowledge base (VERA Files, Rappler, Citron & Chesney, Ong & Cabañes). The AI refuses to guess if a query falls outside the verified database.
- **Five-page editorial site** — Home, The Issue, Prototype, Ethics, and Conclusion pages written at a journalistic standard with full APA citations.
- **Real Philippine case studies** — The Ramon Ang/Elon Musk deepfake scam (VERA Files, 2024) and the Ruth Cabal voice cloning case (Rappler, 2024).
- **Academic ethics framework** — Explicitly aligned with ACM Code of Ethics principles 1.2 (Avoid Harm), 1.3 (Be Honest and Trustworthy), and 2.5 (Give Comprehensive Evaluations).
- **Animated UI** — Scroll-triggered counters, fade-in animations via Framer Motion, and a floating chat panel available on every page.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS |
| Animations | Framer Motion |
| LLM Inference | Groq (Llama 3.3 70B Versatile) |
| Embeddings | Cohere `embed-english-v3.0` (1024 dimensions) |
| Vector Database | Supabase with `pgvector` |
| Ingestion | Custom `ingest.mjs` pipeline with Cheerio |
| Deployment | Vercel |

---

## Architecture

```
User Query
    │
    ▼
Cohere embed-english-v3.0
(inputType: 'search_query')
    │
    ▼
Supabase match_documents()
Vector similarity search (cosine distance)
match_threshold: 0.3 | match_count: 5
    │
    ▼
Retrieved context chunks
(with source metadata headers)
    │
    ▼
Groq Llama 3.3 70B
(temperature: 0.1, system prompt guardrails)
    │
    ▼
Cited response → ChatPanel UI
```

If no context is retrieved above the similarity threshold, the system returns a graceful refusal rather than hallucinating an answer.

---

## Knowledge Base

The RAG database is populated via `ingest.mjs` with the following verified sources:

| Source | Type | Description |
|---|---|---|
| VERA Files (2024) | Journalism | Ramon Ang/Elon Musk deepfake scam fact-check |
| VERA Files (2024) | Journalism | AI scam production report (80% deepfake usage stat) |
| Rappler (2024) | Journalism | Philippines rising AI-driven disinformation report |
| Rappler (2024) | Journalism | Ruth Cabal voice cloning case |
| Citron & Chesney (2019) | Academic | "Deep Fakes: A Looming Challenge" — Liar's Dividend section |
| Ong & Cabañes (2018) | Academic | "Architects of Networked Disinformation" — troll farm hierarchy |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project with `pgvector` enabled
- Cohere API key
- Groq API key

### Installation

```bash
git clone https://github.com/Seth-Ecuacion/TruthLens.git
cd TruthLens
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
COHERE_API_KEY=your_cohere_api_key
GROQ_API_KEY=your_groq_api_key
```

> ⚠️ **Note:** `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. This is acceptable for a prototype — do not expose this key publicly in a production deployment.

### Supabase Setup

Run this SQL in your Supabase SQL Editor to create the vector search function:

```sql
create or replace function match_documents (
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
```

Your `documents` table must have an `embedding` column typed as `vector(1024)` to match Cohere v3 dimensions.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Ingesting the Knowledge Base

1. Create a `data/` folder in the project root
2. Add any local `.txt` source files (e.g., `citron-chesney-liars-dividend.txt`)
3. Run the ingestion pipeline:

```bash
node ingest.mjs
```

The script will attempt to scrape configured URLs and fall back to local files if blocked. It includes deduplication — running it twice will not create duplicate entries.

---

## Project Structure

```
TruthLens/
├── app/
│   ├── api/chat/route.ts     # RAG API endpoint
│   ├── page.tsx              # Home page
│   ├── issue/page.tsx        # The Issue page
│   ├── prototype/page.tsx    # Prototype explainer
│   ├── ethics/page.tsx       # Ethics framework (ACM)
│   └── conclusion/page.tsx   # Synthesis & references
├── components/
│   ├── ChatPanel.tsx         # Floating AI chat widget
│   ├── FadeIn.tsx            # Scroll-triggered animation wrapper
│   ├── AnimatedCounter.tsx   # Scroll-triggered number counter
│   └── InteractiveLayout.tsx # Global layout with navbar & footer
├── data/                     # Local source files for ingestion
├── ingest.mjs                # Knowledge base ingestion pipeline
└── public/                   # Static assets
```

---

## Ethical Design Decisions

TruthLens was built with deliberate constraints:

**Why text-only?** Vision models that scan uploaded videos were rejected due to **Automation Bias** — users tend to trust machine verdicts uncritically, which could make a miscalibrated detector a vector for disinformation itself. A text interface forces users to articulate their query, preserving critical thinking.

**Why RAG over a general LLM?** Standard LLMs hallucinate. For a project about fighting misinformation, a hallucinating chatbot would be directly counterproductive. RAG grounds every response in verified sources and forces a graceful refusal when the answer isn't in the database.

**Why refuse to scan specific viral videos in real time?** Deepfake generators evolve faster than detectors. Offering binary "real/fake" verdicts creates false confidence. Instead, TruthLens teaches detection *methodology* so users can apply critical thinking beyond any single tool.

---

## Academic References

- Citron, D. K., & Chesney, R. (2019). Deep Fakes: A Looming Challenge for Privacy, Democracy, and National Security. *California Law Review, 107*(6), 1753–1820.
- Ong, J. C., & Cabañes, J. V. A. (2018). Architects of Networked Disinformation: Behind the Scenes of Troll Accounts and Fake News Production in the Philippines. *Newton Tech4Dev Network*.
- Wardle, C., & Derakhshan, H. (2017). Information Disorder: Toward an interdisciplinary framework for research and policymaking. *Council of Europe Report DGI(2017)09*.
- Adamopoulou, E., & Moussiades, L. (2020). An Overview of Chatbot Technology. *IFIP Advances in Information and Communication Technology, 584*, 373–383.
- Rappler. (2024). Philippines faces rising AI-driven disinformation. Retrieved from Rappler Newsbreak.
- VERA Files. (2024). FACT CHECK: TV Patrol report about Ramon Ang, Elon Musk investment project is a DEEPFAKE. Retrieved from VERA Files Fact Check.

---

## License

This project was developed as an academic capstone prototype. The codebase is open for educational reference. Knowledge base content sourced from VERA Files and Rappler remains the property of their respective publishers.

---

*Built for the Filipino Digital Citizen — North Eastern Mindanao State University, 2026.*