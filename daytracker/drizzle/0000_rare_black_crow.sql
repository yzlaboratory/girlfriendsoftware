CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"hex" varchar(7),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"done_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"next" integer,
	"prev" integer,
	"priority" smallint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"due_by" timestamp,
	"done_at" timestamp
);
