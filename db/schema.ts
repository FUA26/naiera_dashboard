import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull(), // "todo" | "in-progress" | "done" | "canceled"
  priority: text("priority").notNull(), // "low" | "medium" | "high"
  label: text("label").notNull(), // "feature" | "bug" | "enhancement" | "documentation"
  estimatedHours: integer("estimated_hours").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
