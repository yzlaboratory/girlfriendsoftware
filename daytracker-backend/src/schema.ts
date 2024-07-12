import {
  boolean,
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
  priority: smallint("priority"),
  private: boolean("private"),
  project: integer("project_id").references(() => projects.id),
  due: timestamp("due", { mode: "date" }),
  created: timestamp("created", { mode: "date" }).defaultNow().notNull(),
  done: timestamp("done", { mode: "date" }),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  hex: varchar("hex", { length: 7 }),
  created: timestamp("created", { mode: "date" }).defaultNow().notNull(),
  done: timestamp("done", { mode: "date" }),
});

export type Task = typeof tasks.$inferSelect;
export type newTask = typeof tasks.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type newProject = typeof projects.$inferInsert;
