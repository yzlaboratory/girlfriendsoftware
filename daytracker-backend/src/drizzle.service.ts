import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

@Injectable()
export class DrizzleService {
  public readonly db: PostgresJsDatabase<Record<string, never>>;

  constructor(private configService: ConfigService) {
    const client = postgres(this.configService.get("DATABASE_URL"));
    this.db = drizzle(client);
  }
}
