ALTER TABLE "tasks" ADD COLUMN "private" boolean;--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "next";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "prev";