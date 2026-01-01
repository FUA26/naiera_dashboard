import { Suspense } from "react";
import { getProjects, getTasks, getUsers } from "./actions";
import { searchParamsCache } from "./search-params";
import { TasksTable } from "./tasks-table";
import { type SearchParams } from "nuqs/server";

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function TasksPage({ searchParams }: PageProps) {
  // Parse search params using nuqs cache
  const {
    page,
    pageSize,
    sort,
    title,
    status,
    priority,
    projectId,
    assigneeId,
    dateFrom,
    dateTo,
  } = await searchParamsCache.parse(searchParams);

  // Fetch data in parallel
  const [tasksData, projects, users] = await Promise.all([
    getTasks({
      page,
      pageSize,
      sort,
      title,
      status,
      priority,
      projectId,
      assigneeId,
      dateFrom,
      dateTo,
    }),
    getProjects(),
    getUsers(),
  ]);

  const { data, pageCount } = tasksData;

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground mt-2">
          Manage your tasks with advanced filtering, sorting, and bulk actions.
        </p>
      </div>

      <Suspense fallback={<div>Loading tasks...</div>}>
        <TasksTable
          data={data}
          pageCount={pageCount}
          projects={projects}
          users={users}
        />
      </Suspense>
    </div>
  );
}
