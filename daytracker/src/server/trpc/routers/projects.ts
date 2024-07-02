import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../../db";
import { projects } from "../../../schema";
import { publicProcedure, router } from "../trpc";

export const projectRouter = router({
  create: publicProcedure
    .input(
      z.object({
        project: z.string(),
      }),
    )
    .mutation(
      async ({ input }) =>
        await db.insert(projects).values({ name: input.project }).returning(),
    ),
  list: publicProcedure.query(async () => {
    const selectedProjects = await db.select().from(projects);
    return selectedProjects.map((project) => ({ ...project, id: +project.id }));
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(
      async ({ input }) =>
        await db.delete(projects).where(eq(projects.id, input.id)).returning(),
    ),
});
