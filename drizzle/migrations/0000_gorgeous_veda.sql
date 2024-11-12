CREATE TABLE IF NOT EXISTS "pokemon" (
	"id" text PRIMARY KEY NOT NULL,
	"number" integer DEFAULT 0 NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"type1" text DEFAULT '' NOT NULL,
	"type2" text,
	"total" integer DEFAULT 0 NOT NULL,
	"hp" integer DEFAULT 0 NOT NULL,
	"attack" integer DEFAULT 0 NOT NULL,
	"defense" integer DEFAULT 0 NOT NULL,
	"spAtk" integer DEFAULT 0 NOT NULL,
	"spDef" integer DEFAULT 0 NOT NULL,
	"speed" integer DEFAULT 0 NOT NULL,
	"generation" integer DEFAULT 1 NOT NULL,
	"legendary" boolean DEFAULT false NOT NULL,
	"embedding" vector(768)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pokemon_embedding_index" ON "pokemon" USING hnsw (embedding vector_cosine_ops);