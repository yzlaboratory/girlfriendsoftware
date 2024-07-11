import { Module } from "@nestjs/common";
import { DrizzleService } from "./drizzle.service";

@Module({
  providers: [DrizzleService],
  controllers: [],
  imports: [],
  exports: [DrizzleService],
})
export class DrizzleModule {}
