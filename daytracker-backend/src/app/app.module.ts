import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "../drizzle.module";
import { TasksModule } from "../tasks/tasks.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
