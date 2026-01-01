import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// Roles table
export const roles = sqliteTable("roles", {
  id: text("id").primaryKey(), // 'admin', 'user', etc.
  name: text("name").notNull().unique(),
  description: text("description"),
});

// Users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"), // In a real app, this should be hashed
  roleId: text("role_id").references(() => roles.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

// Projects table
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: text("owner_id").references(() => users.id),
  status: text("status").notNull().default("active"), // active, archived
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

// Enums
export const taskStatus = ["todo", "in-progress", "done", "canceled"] as const;
export type TaskStatus = (typeof taskStatus)[number];

export const taskPriority = ["low", "medium", "high"] as const;
export type TaskPriority = (typeof taskPriority)[number];

export const taskLabel = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
] as const;
export type TaskLabel = (typeof taskLabel)[number];

// Tasks table
export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: taskStatus }).notNull(), // "todo" | "in-progress" | "done" | "canceled"
  priority: text("priority", { enum: taskPriority }).notNull(), // "low" | "medium" | "high"
  label: text("label", { enum: taskLabel }).notNull(), // "feature" | "bug" | "enhancement" | "documentation"
  estimatedHours: integer("estimated_hours").notNull().default(0),

  // Relations
  projectId: text("project_id").references(() => projects.id),
  assigneeId: text("assignee_id").references(() => users.id),
  reporterId: text("reporter_id").references(() => users.id),
  parentId: text("parent_id"), // For subtasks (self-referencing logic handled in app or via relations if strictly needed, keeping simple text for now)

  dueDate: integer("due_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

// Relations Definitions
export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  ownedProjects: many(projects),
  assignedTasks: many(tasks, { relationName: "assignee" }),
  reportedTasks: many(tasks, { relationName: "reporter" }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
  }),
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
    relationName: "assignee",
  }),
  reporter: one(users, {
    fields: [tasks.reporterId],
    references: [users.id],
    relationName: "reporter",
  }),
}));

export type Role = typeof roles.$inferSelect;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Task = typeof tasks.$inferSelect;
