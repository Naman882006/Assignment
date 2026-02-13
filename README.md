# Private Knowledge Q&A

A simple AI-powered web app that allows users to upload text documents and ask questions about them.

## Features
- Upload .txt documents
- View uploaded document list
- Ask questions about the content
- Get answers with source citation
- Backend health check route

## Tech Stack
- Next.js (App Router)
- Supabase (Database)
- OpenRouter (LLM API)
- TailwindCSS

## How to Run Locally

1. Clone repo
2. Install dependencies
   npm install
3. Add env variables in .env.local
4. Run dev server
   npm run dev

## Live Demo
https://private-knowledge-qa.vercel.app/

## Limitations
- Only supports .txt files
- Basic document matching logic

## Future Improvements
- PDF/DOCX parsing
- Better semantic search
- Multi-user support
