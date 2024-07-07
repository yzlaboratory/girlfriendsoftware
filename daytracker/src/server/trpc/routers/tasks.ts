import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../../db";
import { tasks } from "../../../schema";
import { publicProcedure, router } from "../trpc";

export const taskRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        priority: z.number(),
        project: z.number(),
        due: z.date(),
      }),
    )
    .mutation(
      async ({ input }) =>
        await db
          .insert(tasks)
          .values({
            name: input.name,
            priority: input.priority,
            due: input.due,
            project: input.project,
          })
          .returning(),
    ),
  list: publicProcedure.query(async () => {
    const selectedTasks = await db.select().from(tasks);
    return selectedTasks.map((task) => ({ ...task, id: +task.id }));
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(
      async ({ input }) =>
        await db.delete(tasks).where(eq(tasks.id, input.id)).returning(),
    ),
});
