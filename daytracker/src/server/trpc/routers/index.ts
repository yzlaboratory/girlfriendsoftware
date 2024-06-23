import { router } from "../trpc";
import { taskRouter } from "./tasks";

export const appRouter = router({
  task: taskRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
