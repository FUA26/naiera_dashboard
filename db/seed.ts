import { db } from "./index";
import { tasks, users, roles, projects } from "./schema";
import { v4 as uuidv4 } from "uuid";

async function main() {
  console.log("🌱 Seeding database...");

  try {
    // 1. Clean up existing data
    console.log("Cleaning up existing data...");
    await db.delete(tasks).run();
    await db.delete(projects).run();
    await db.delete(users).run();
    await db.delete(roles).run();

    // 2. Create Roles
    console.log("Creating roles...");
    const roleAdminId = "role-admin";
    const roleUserId = "role-user";

    await db
      .insert(roles)
      .values([
        {
          id: roleAdminId,
          name: "admin",
          description: "Administrator with full access",
        },
        { id: roleUserId, name: "user", description: "Regular user" },
      ])
      .run();

    // 3. Create Users
    console.log("Creating users...");
    const adminId = "user-admin-01";
    const user1Id = "user-01";
    const user2Id = "user-02";

    await db
      .insert(users)
      .values([
        {
          id: adminId,
          name: "Admin User",
          email: "admin@example.com",
          roleId: roleAdminId,
        },
        {
          id: user1Id,
          name: "John Doe",
          email: "john@example.com",
          roleId: roleUserId,
        },
        {
          id: user2Id,
          name: "Jane Smith",
          email: "jane@example.com",
          roleId: roleUserId,
        },
      ])
      .run();

    // 4. Create Projects
    console.log("Creating projects...");
    const project1Id = "proj-01";
    const project2Id = "proj-02";

    await db
      .insert(projects)
      .values([
        {
          id: project1Id,
          name: "Website Redesign",
          description: "Overhaul of the main corporate website",
          ownerId: adminId,
          status: "active",
        },
        {
          id: project2Id,
          name: "Mobile App Launch",
          description: "Launch activities for the new mobile app",
          ownerId: user1Id,
          status: "active",
        },
      ])
      .run();

    // 5. Create Tasks
    console.log("Creating tasks...");
    const tasksData = [
      {
        id: `task-${uuidv4()}`,
        title: "Design Home Page",
        description: "Create figma mockups for the new home page",
        status: "in-progress",
        priority: "high",
        label: "feature",
        estimatedHours: 8,
        projectId: project1Id,
        assigneeId: user1Id,
        reporterId: adminId,
        createdAt: new Date(),
      },
      {
        id: `task-${uuidv4()}`,
        title: "Setup CI/CD Pipeline",
        description: "Configure GitHub Actions for deployment",
        status: "todo",
        priority: "medium",
        label: "enhancement",
        estimatedHours: 4,
        projectId: project1Id,
        assigneeId: user2Id,
        reporterId: adminId,
        createdAt: new Date(),
      },
      {
        id: `task-${uuidv4()}`,
        title: "Fix Login Bug",
        description: "User cannot login with special characters",
        status: "todo",
        priority: "high",
        label: "bug",
        estimatedHours: 2,
        projectId: project2Id,
        assigneeId: user1Id,
        reporterId: user2Id,
        createdAt: new Date(),
      },
    ];

    // Typings might need coercion if strictness varies, but usually fine
    // @ts-ignore
    await db.insert(tasks).values(tasksData).run();

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
