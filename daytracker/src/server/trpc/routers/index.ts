import { router } from "../trpc";
import { projectRouter } from "./projects";
import { taskRouter } from "./tasks";

export const appRouter = router({
  task: taskRouter,
  project: projectRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
