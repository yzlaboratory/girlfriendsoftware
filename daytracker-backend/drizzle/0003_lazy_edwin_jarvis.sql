ALTER TABLE "projects" RENAME TO "project";--> statement-breakpoint
ALTER TABLE "tasks" RENAME TO "task";--> statement-breakpoint
ALTER TABLE "task" DROP CONSTRAINT "tasks_project_id_projects_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
