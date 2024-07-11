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
  created_at: Date;
  finished_at: Date | null;
  next: number | null;
  prev: number | null;
  priority: number | null;
  due: Date | null;
  project: number | null;
};

export type newTask = {
  name: string | null | undefined;
  priority: number | null | undefined;
  due: Date | null | undefined;
  project: string | null | undefined;
};
