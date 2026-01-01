"use server";

import { db } from "@/db";
import { tasks, type Task, projects, users } from "@/db/schema";
import { and, asc, desc, eq, gte, inArray, like, lte, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type GetTasksParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  title?: string;
  status?: string;
  priority?: string;
  projectId?: string;
  assigneeId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function getProjects() {
  return await db.select().from(projects);
}

export async function getUsers() {
  return await db.select().from(users);
}

export async function getTasks(params: GetTasksParams) {
  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const offset = (page - 1) * pageSize;

  const conditions = [];

  if (params.title) {
    conditions.push(like(tasks.title, `%${params.title}%`));
  }
  if (params.status) {
    conditions.push(inArray(tasks.status, params.status.split(".") as any[]));
  }
  if (params.priority) {
    conditions.push(
      inArray(tasks.priority, params.priority.split(".") as any[])
    );
  }
  if (params.projectId) {
    conditions.push(inArray(tasks.projectId, params.projectId.split(".")));
  }
  if (params.assigneeId) {
    conditions.push(inArray(tasks.assigneeId, params.assigneeId.split(".")));
  }

  // Date filter
  if (params.dateFrom) {
    const fromDate = new Date(params.dateFrom);
    fromDate.setHours(0, 0, 0, 0);
    conditions.push(gte(tasks.createdAt, fromDate));
  }
  if (params.dateTo) {
    const toDate = new Date(params.dateTo);
    toDate.setHours(23, 59, 59, 999);
    conditions.push(lte(tasks.createdAt, toDate));
  }

  const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

  // Sorting
  let orderBy = desc(tasks.createdAt); // Default
  if (params.sort) {
    const [column, order] = params.sort.split(".");
    const sortCol =
      column === "createdAt"
        ? tasks.createdAt
        : column === "estimatedHours"
          ? tasks.estimatedHours
          : column === "title"
            ? tasks.title
            : column === "status"
              ? tasks.status
              : column === "priority"
                ? tasks.priority
                : tasks.createdAt;

    orderBy = order === "desc" ? desc(sortCol) : asc(sortCol);
  }

  const data = await db.query.tasks.findMany({
    where: whereCondition,
    limit: pageSize,
    offset: offset,
    orderBy: [orderBy],
    with: {
      project: true,
      assignee: true,
      reporter: true,
    },
  });

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(whereCondition);

  const total = countResult[0].count;
  const pageCount = Math.ceil(total / pageSize);

  return {
    data,
    pageCount,
    total,
  };
}

export async function deleteTasks({ ids }: { ids: string[] }) {
  if (!ids.length) return;
  await db.delete(tasks).where(inArray(tasks.id, ids));
  revalidatePath("/demo/table");
}

export async function updateTaskStatus({
  ids,
  status,
}: {
  ids: string[];
  status: string;
}) {
  if (!ids.length) return;
  await db
    .update(tasks)
    .set({ status: status as any })
    .where(inArray(tasks.id, ids));

  revalidatePath("/demo/table");
}

export async function deleteTask({ id }: { id: string }) {
  await db.delete(tasks).where(eq(tasks.id, id));
}

export async function updateTask({
  id,
  title,
  status,
  priority,
  label,
  estimatedHours,
}: {
  id: string;
  title: string;
  status: string;
  priority: string;
  label: string;
  estimatedHours: number;
}) {
  await db
    .update(tasks)
    .set({
      title,
      status: status as any,
      priority: priority as any,
      label: label as any,
      estimatedHours,
    })
    .where(eq(tasks.id, id));
}

export async function getTaskById({ id }: { id: string }) {
  const result = await db.select().from(tasks).where(eq(tasks.id, id));
  return result[0] || null;
}
