# ArchCoach

AI mock system-design interviewer for a 48-hour hackathon.

This package contains the initial ArchCoach project structure and the level-specific
interviewer, diagram critic, and scorecard prompts.

## Current package

- Next.js App Router project structure
- Junior interviewer prompt
- Senior interviewer prompt
- Staff interviewer prompt
- Live diagram critic prompt
- Structured scorecard prompt

## Planned implementation

The remaining application layers are:
- Typed domain models
- Zod validation
- Anthropic server integration
- Interview API
- Diagram critic API
- Scorecard API
- Excalidraw integration
- Web Speech recognition/synthesis
- 20-second interview orchestration
- Local session history
- Results sharing
- Radar score visualization
- Full Vercel deployment configuration

## Folder structure

```text
archcoach/
├── app/
│   ├── api/
│   │   ├── interview/route.ts
│   │   ├── critic/route.ts
│   │   └── scorecard/route.ts
│   ├── interview/page.tsx
│   ├── results/[sessionId]/page.tsx
│   ├── history/page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── interview/
│   ├── whiteboard/
│   ├── scorecard/
│   └── ui/
├── hooks/
├── lib/
├── prompts/
├── types/
├── public/
├── .env.example
├── package.json
└── README.md
```
