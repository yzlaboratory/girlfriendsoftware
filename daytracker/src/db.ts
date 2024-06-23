import { drizzle } from "drizzle-orm/postgres-js";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import postgres from "postgres";

const connectionString = process.env["DATABASE_URL"]!;
const client = postgres(connectionString);
export const db = drizzle(client);
