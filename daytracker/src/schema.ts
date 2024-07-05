import {
  integer,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  name: text("name"),
  next: integer("next"),
  prev: integer("prev"),
  priority: smallint("priority"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  due_by: timestamp("due_by"),
  finished_at: timestamp("done_at", { mode: "date" }),
  project: integer("project_id").references(() => projects.id),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  hex: varchar("hex", { length: 7 }),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  finished_at: timestamp("done_at", { mode: "date" }),
});

export type Task = typeof tasks.$inferSelect;
export type newTask = typeof tasks.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type newProject = typeof projects.$inferInsert;
//export type Note = InferSelectModel<typeof notes>;
//export type NewNote = InferInsertModel<typeof notes>;
