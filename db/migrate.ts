import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./index";

async function main() {
  console.log("🚀 Running migrations...");
  try {
    await migrate(db, { migrationsFolder: "db/migrations" });
    console.log("✅ Migrations completed!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
