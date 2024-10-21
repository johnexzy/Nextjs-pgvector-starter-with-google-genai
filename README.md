---
name: Vercel Postgres + Drizzle ORM + pgvector Next.js Starter
slug: postgres-pgvector
description: A Next.js template that uses Vercel Postgres as the database, Drizzle ORM as the ORM with pgvector to enable vector similarity search, and Google GenAI's text-embedding-004 model for embeddings.
framework: Next.js
useCase: Starter
css: Tailwind
database: Vercel Postgres
demoUrl: https://postgres-pgvector.vercel.app/
relatedTemplates:
  - postgres-starter
  - postgres-kysely
  - postgres-drizzle
---

# Vercel Postgres + Drizzle ORM + pgvector + Google GenAI Next.js Starter

A Next.js template that uses [Vercel Postgres](https://vercel.com/postgres) as the database, [Drizzle ORM](https://orm.drizzle.team/) as the ORM with [pgvector](https://github.com/pgvector/pgvector-node#drizzle-orm) to enable vector similarity search, and Google GenAI's [`text-embedding-004`](https://cloud.google.com/vertex-ai/generative-ai/docs/text-embedding/text-embedding-004) model for embeddings.

## Demo

https://postgres-pgvector.vercel.app/


### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/storage/postgres-pgvector
```

Once that's done, copy the .env.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the environment variables to match the ones in your Vercel Storage Dashboard.

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) ([Documentation](https://nextjs.org/docs/deployment)).
