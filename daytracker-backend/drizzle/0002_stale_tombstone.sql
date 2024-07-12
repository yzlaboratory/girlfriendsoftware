ALTER TABLE "projects" RENAME COLUMN "created_at" TO "created";--> statement-breakpoint
ALTER TABLE "projects" RENAME COLUMN "done_at" TO "done";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "created_at" TO "created";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "done_at" TO "done";