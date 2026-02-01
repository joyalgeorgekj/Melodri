### Folder Structure:
```
gemini-music-finder/
│
├── apps/
│   │
│   ├── frontend/                         # React UI
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/                 # API client (N8N)
│   │   │   ├── hooks/
│   │   │   └── main.tsx
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── server/                           # Express + FFmpeg worker
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   └── processAudio.ts
│   │   │   ├── ffmpeg/
│   │   │   │   └── processor.ts
│   │   │   ├── storage/                 # Local + future cloud abstraction
│   │   │   │   ├── localStorage.ts
│   │   │   │   └── storage.interface.ts
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── n8n/                              # Workflow engine
│       ├── workflows/                   # Versioned workflows
│       │   ├── song-identify.json
│       │   └── trim-and-identify.json
│       ├── credentials/                 # (optional) encrypted backups only
│       ├── Dockerfile                   # Optional custom N8N build
│       ├── .env
│       └── .env.example
│
├── shared/
│   ├── volumes/                         # Mounted shared storage
│   │   ├── input/
│   │   └── output/
│   │
│   ├── types/                           # Shared TS interfaces
│   │   └── audio.ts
│   │
│   └── utils/                           # Cross-service helpers
│
├── infra/
│   ├── docker-compose.yml               # One-command stack startup
│   ├── env/
│   │   └── production.env.template
│   └── reverse-proxy/                   # Optional (nginx/traefik later)
│
├── scripts/
│   ├── setup.sh                         # First-time setup
│   ├── dev.sh                           # Local dev runner
│   └── build.sh                         # Production build
│
├── .env                                 # Root env (gitignored)
├── .env.example                         # Full env reference
├── .gitignore
├── README.md
└── package.json                         # Workspace + tooling
```

> “For hackathon scope, we intentionally avoided authentication to keep the system simple and focused on core ML/audio processing, but we implemented strict rate limiting, file validation, and container isolation to prevent abuse and ensure reliability.”