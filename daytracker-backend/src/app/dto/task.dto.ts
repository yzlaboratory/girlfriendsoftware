import { Type } from "class-transformer";

export class TaskDTO {
  id: number;
  name: string;
  priority: number;
  private: boolean;
  project: number;
  @Type(() => Date)
  done: Date;
  @Type(() => Date)
  due: Date;
}
