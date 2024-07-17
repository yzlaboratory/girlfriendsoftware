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
  isPrivate: boolean | null;
  project: number | null;
  created_at: Date;
  done: Date | null;
  due: Date | null;
};

export type newTask = {
  name: string | null | undefined;
  priority: number | null | undefined;
  due: Date | null | undefined;
  project: string | null | undefined;
  isPrivate: boolean | null | undefined;
};
