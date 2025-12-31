import { db } from "./index";
import { tasks } from "./schema";
import { tasks as initialTasks } from "./initial-data";

async function main() {
  console.log("🌱 Seeding database...");

  try {
    // Delete existing data
    await db.delete(tasks).run();

    console.log(`Inserting ${initialTasks.length} tasks...`);

    // Batch insert
    const formattedTasks = initialTasks.map((t) => ({
      id: t.id,
      title: t.title,
      status: t.status,
      priority: t.priority,
      label: t.label,
      estimatedHours: t.estimatedHours,
      createdAt: t.createdAt,
    }));

    await db.insert(tasks).values(formattedTasks).run();

    console.log("✅ Database seeded successfully!");

    // LibSQL client might cause process to hang if not closed,
    // but db object doesn't expose close easily?
    // Usually it's fine for scripts, process.exit handles it.
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
