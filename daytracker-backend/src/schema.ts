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

export const task = pgTable("task", {
  id: serial("id").primaryKey(),
  name: text("name"),
  priority: smallint("priority"),
  private: boolean("private"),
  project: integer("project_id").references(() => project.id),
  due: timestamp("due", { mode: "date" }),
  created: timestamp("created", { mode: "date" }).defaultNow().notNull(),
  done: timestamp("done", { mode: "date" }),
});

export const project = pgTable("project", {
  id: serial("id").primaryKey(),
  name: text("name"),
  hex: varchar("hex", { length: 7 }),
  created: timestamp("created", { mode: "date" }).defaultNow().notNull(),
  done: timestamp("done", { mode: "date" }),
});

export type Task = typeof task.$inferSelect;
export type newTask = typeof task.$inferInsert;
export type Project = typeof project.$inferSelect;
export type newProject = typeof project.$inferInsert;
