import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class CreateTaskDto {
  name: string;
  project: number;
  priority: number;
  @Type(() => Date)
  @IsDate()
  due: Date;
}
