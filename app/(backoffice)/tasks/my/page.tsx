import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconListCheck,
  IconClock,
  IconCircleCheck,
  IconAlertCircle,
  IconUser,
} from "@tabler/icons-react";

// Mock data for demonstration - in real app, this would filter by current user
const myTasks = [
  {
    id: "TASK-001",
    title: "Design homepage wireframes",
    status: "in-progress",
    priority: "high",
    project: "Website Redesign",
    dueDate: "2026-01-05",
  },
  {
    id: "TASK-002",
    title: "Review API documentation",
    status: "todo",
    priority: "medium",
    project: "Mobile App Launch",
    dueDate: "2026-01-08",
  },
  {
    id: "TASK-003",
    title: "Fix login bug",
    status: "done",
    priority: "high",
    project: "Website Redesign",
    dueDate: "2025-12-28",
  },
  {
    id: "TASK-004",
    title: "Update user settings page",
    status: "todo",
    priority: "low",
    project: "Internal Tools",
    dueDate: "2026-01-15",
  },
];

const statusColors: Record<string, string> = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
};

const priorityColors: Record<string, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function MyTasksPage() {
  const todoCount = myTasks.filter((t) => t.status === "todo").length;
  const inProgressCount = myTasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const doneCount = myTasks.filter((t) => t.status === "done").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-muted-foreground">
            Tasks assigned to you • {myTasks.length} total
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-slate-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              To Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todoCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inProgressCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{doneCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>Tasks currently assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myTasks.map((task) => (
              <div
                key={task.id}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{task.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {task.id}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span>{task.project}</span>
                    <span>•</span>
                    <span>
                      Due: {new Date(task.dueDate).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={priorityColors[task.priority]}>
                    {task.priority}
                  </Badge>
                  <Badge className={statusColors[task.status]}>
                    {task.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
