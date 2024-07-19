export type Project = {
  id: number;
  name: string | null;
  hex: string | null;
  created_at: Date;
  finished_at: Date | null;
};

export type Task = {
  id: number;
  name: string | null;
  priority: number | null;
  private: boolean | null;
  project: number | null;
  created_at: Date;
  done: Date | null;
  due: Date | null;
};

export type TaskWithProject = { task: Task; project: Project };

export type newTask = {
  name: string | null | undefined;
  priority: number | null | undefined;
  due: Date | null | undefined;
  project: string | null | undefined;
  private: boolean | null | undefined;
};
