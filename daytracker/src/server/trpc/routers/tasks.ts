import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "../../../db";
import { eq } from "drizzle-orm";
import { tasks } from "../../../schema";

export const taskRouter = router({
  create: publicProcedure
    .input(
      z.object({
        task: z.string(),
      })
    )
    .mutation(
      async ({ input }) =>
        await db.insert(tasks).values({ name: input.task }).returning()
    ),
  list: publicProcedure.query(async () => {
    const selectedTasks = await db.select().from(tasks);
    return selectedTasks.map((task) => ({ ...task, id: +task.id }));
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(
      async ({ input }) =>
        await db.delete(tasks).where(eq(tasks.id, input.id)).returning()
    ),
});
