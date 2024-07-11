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
	"due" timestamp,
	"done_at" timestamp,
	"project_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
