import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";

export class CreateTaskDto {
  name: string;
  priority: number;
  isPrivate: boolean;
  project: number;
  @Optional()
  @Type(() => Date)
  due: Date;
}
