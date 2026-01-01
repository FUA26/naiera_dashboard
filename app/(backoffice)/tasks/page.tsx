import { Suspense } from "react";
import { getProjects, getTasks, getUsers } from "@/app/demo/table/actions";
import { searchParamsCache } from "@/app/demo/table/search-params";
import { TasksTable } from "@/app/demo/table/tasks-table";
import { type SearchParams } from "nuqs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconListCheck,
  IconClock,
  IconCircleCheck,
  IconAlertCircle,
  IconPlus,
  IconTrendingUp,
  IconCircleX,
} from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<SearchParams>;
}

// Loading skeleton for the table
function TableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[250px]" />
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[100px]" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AllTasksPage({ searchParams }: PageProps) {
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

  const { data, pageCount, total } = tasksData;

  // Calculate stats from total data (not just current page)
  const todoCount = data.filter((t) => t.status === "todo").length;
  const inProgressCount = data.filter((t) => t.status === "in-progress").length;
  const doneCount = data.filter((t) => t.status === "done").length;
  const canceledCount = data.filter((t) => t.status === "canceled").length;

  // Calculate completion rate
  const completionRate =
    total > 0 ? Math.round((doneCount / data.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
            <Badge variant="secondary" className="text-sm">
              {total} total
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage and track all tasks across {projects.length} projects
          </p>
        </div>
        <Button size="lg" className="shrink-0">
          <IconPlus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Tasks */}
        <Card className="relative overflow-hidden">
          <div className="from-primary/10 to-primary/5 absolute inset-0 bg-gradient-to-br" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <div className="bg-primary/10 rounded-full p-2">
              <IconListCheck className="text-primary h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{total}</div>
            <div className="text-muted-foreground mt-1 flex items-center text-xs">
              <IconTrendingUp className="mr-1 h-3 w-3 text-green-500" />
              Across {projects.length} projects
            </div>
          </CardContent>
        </Card>

        {/* Todo */}
        <Card className="border-l-4 border-l-slate-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <IconAlertCircle className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todoCount}</div>
            <p className="text-muted-foreground text-xs">Waiting to start</p>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <IconClock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-muted-foreground text-xs">Currently working</p>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <IconCircleCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doneCount}</div>
            <p className="text-muted-foreground text-xs">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        {/* Canceled */}
        <Card className="border-l-4 border-l-red-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceled</CardTitle>
            <IconCircleX className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{canceledCount}</div>
            <p className="text-muted-foreground text-xs">Stopped tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader className="bg-muted/30 border-b px-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Task List</CardTitle>
              <CardDescription>
                View and manage all tasks with filtering, sorting, and bulk
                actions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Suspense fallback={<TableSkeleton />}>
            <div className="p-4">
              <TasksTable
                data={data}
                pageCount={pageCount}
                projects={projects}
                users={users}
              />
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
