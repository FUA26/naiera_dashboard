"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// Mock data for Kanban board
const columns = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-slate-500",
    tasks: [
      {
        id: "TASK-001",
        title: "Research competitor analysis",
        priority: "medium",
        assignee: "John Doe",
      },
      {
        id: "TASK-002",
        title: "Create user personas",
        priority: "high",
        assignee: "Jane Smith",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-500",
    tasks: [
      {
        id: "TASK-003",
        title: "Design homepage wireframes",
        priority: "high",
        assignee: "John Doe",
      },
      {
        id: "TASK-004",
        title: "Implement authentication",
        priority: "high",
        assignee: "Admin User",
      },
      {
        id: "TASK-005",
        title: "Setup database schema",
        priority: "medium",
        assignee: "Jane Smith",
      },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "bg-yellow-500",
    tasks: [
      {
        id: "TASK-006",
        title: "API endpoint documentation",
        priority: "low",
        assignee: "Admin User",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-500",
    tasks: [
      {
        id: "TASK-007",
        title: "Project kickoff meeting",
        priority: "high",
        assignee: "John Doe",
      },
      {
        id: "TASK-008",
        title: "Setup development environment",
        priority: "medium",
        assignee: "Jane Smith",
      },
      {
        id: "TASK-009",
        title: "Define project scope",
        priority: "high",
        assignee: "Admin User",
      },
    ],
  },
];

const priorityColors: Record<string, string> = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function KanbanPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-muted-foreground mt-1">
            Visualize your workflow and track progress
          </p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid gap-4 md:grid-cols-4">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${column.color}`} />
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="secondary" className="ml-auto">
                {column.tasks.length}
              </Badge>
            </div>

            {/* Column Content */}
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-grab transition-shadow hover:shadow-md active:cursor-grabbing"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <IconGripVertical className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <p className="text-sm leading-tight font-medium">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge
                            className={priorityColors[task.priority]}
                            variant="secondary"
                          >
                            {task.priority}
                          </Badge>
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.assignee}`}
                            />
                            <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {task.id}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Task Button */}
              <Button variant="ghost" className="w-full border-2 border-dashed">
                <IconPlus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
