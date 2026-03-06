import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.ts";

console.log(process.env.DATABASE_URL);
const client = postgres(
  process.env.DATABASE_URL!,
  {
    prepare: false,
    ssl: 'require'
  });
export const db = drizzle(client, { schema });