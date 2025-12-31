"use server";

import { db } from "@/db";
import { tasks, type Task } from "@/db/schema";
import { and, asc, desc, eq, inArray, like, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type GetTasksParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  title?: string;
  status?: string;
  priority?: string;
};

export async function getTasks(params: GetTasksParams) {
  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const offset = (page - 1) * pageSize;

  const conditions = [];

  if (params.title) {
    conditions.push(like(tasks.title, `%${params.title}%`));
  }
  if (params.status) {
    conditions.push(inArray(tasks.status, params.status.split(".")));
  }
  if (params.priority) {
    conditions.push(inArray(tasks.priority, params.priority.split(".")));
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

  // Transaction for data + count
  // LibSQL/Drizzle doesn't support transaction return easily for read?
  // We can just run two queries.

  const data = await db
    .select()
    .from(tasks)
    .where(whereCondition)
    .limit(pageSize)
    .offset(offset)
    .orderBy(orderBy);

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
  await db.update(tasks).set({ status }).where(inArray(tasks.id, ids));

  revalidatePath("/demo/table");
}
