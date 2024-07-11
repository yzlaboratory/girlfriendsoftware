import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "../drizzle.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
