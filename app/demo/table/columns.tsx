"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react";
import { Task, Project, User } from "@/db/schema";
import { DataTableColumnHeader } from "@/components/data-table";
import { TaskActions } from "./components/task-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Type definition for task with relations
export type TaskWithRelations = Task & {
  project: Project | null;
  assignee: User | null;
  reporter: User | null;
};

// ... (keep existing statusIcons, priorityIcons, etc.)

// Status icon mapping
const statusIcons: Record<Task["status"], React.ReactNode> = {
  todo: <IconCircle className="text-muted-foreground h-4 w-4" />,
  "in-progress": <IconLoader className="h-4 w-4 animate-spin text-blue-500" />,
  done: <IconCircleCheck className="h-4 w-4 text-green-500" />,
  canceled: <IconCircleX className="h-4 w-4 text-red-500" />,
  // Fallback if needed, but type should enforce these
};

const statusLabels: Record<Task["status"], string> = {
  todo: "Todo",
  "in-progress": "In Progress",
  done: "Done",
  canceled: "Canceled",
};

// Priority icon mapping
const priorityIcons: Record<Task["priority"], React.ReactNode> = {
  low: <IconArrowDown className="text-muted-foreground h-4 w-4" />,
  medium: <IconArrowRight className="h-4 w-4 text-yellow-500" />,
  high: <IconArrowUp className="h-4 w-4 text-red-500" />,
};

const priorityLabels: Record<Task["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

// Label badge variant mapping
const labelVariants: Record<
  Task["label"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  feature: "default",
  bug: "destructive",
  enhancement: "secondary",
  documentation: "outline",
};

export const columns: ColumnDef<TaskWithRelations>[] = [
  // Select column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Task ID column
  {
    accessorKey: "id",
    header: "Task ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      // Remove any existing prefix and show shortened format
      const cleanId = id.replace(/^task-/i, "");
      const shortId = cleanId.slice(0, 8).toUpperCase();
      return (
        <div className="text-muted-foreground w-[100px] font-mono text-xs">
          #{shortId}
        </div>
      );
    },
    enableHiding: true,
  },
  // Title column with label badge
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = row.original.label;
      return (
        <div className="flex max-w-[500px] items-center gap-2">
          <Badge variant={labelVariants[label]} className="shrink-0">
            {label}
          </Badge>
          <span className="truncate font-medium">{row.getValue("title")}</span>
        </div>
      );
    },
  },
  // Project Column
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      const project = row.original.project;
      return project ? (
        <Badge variant="outline" className="font-normal">
          {project.name}
        </Badge>
      ) : (
        <span className="text-muted-foreground text-xs">-</span>
      );
    },
  },
  // Assignee Column
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return assignee ? (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${assignee.name}`}
              alt={assignee.name}
            />
            <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{assignee.name}</span>
        </div>
      ) : (
        <span className="text-muted-foreground text-xs">-</span>
      );
    },
  },
  // Status column
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      return (
        <div className="flex items-center gap-2">
          {statusIcons[status]}
          <span>{statusLabels[status]}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Priority column
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Task["priority"];
      return (
        <div className="flex items-center gap-2">
          {priorityIcons[priority]}
          <span>{priorityLabels[priority]}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Estimated Hours column
  {
    accessorKey: "estimatedHours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Est. Hours" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("estimatedHours")}</div>
    ),
  },
  // Created At column
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div>
          {date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!value) return true;

      const rowDate = row.getValue(id) as Date;
      const rowDateTime = new Date(rowDate).setHours(0, 0, 0, 0);

      // Handle filter format with from/to
      if (typeof value === "object" && "from" in value) {
        const { from, to } = value;
        if (from && to) {
          const fromDate = new Date(from).setHours(0, 0, 0, 0);
          const toDate = new Date(to).setHours(23, 59, 59, 999);
          return rowDateTime >= fromDate && rowDateTime <= toDate;
        }
        if (from) {
          const fromDate = new Date(from).setHours(0, 0, 0, 0);
          return rowDateTime === fromDate;
        }
      }

      // Legacy: simple date string
      if (typeof value === "string") {
        const filterDate = new Date(value).setHours(0, 0, 0, 0);
        return rowDateTime === filterDate;
      }

      return true;
    },
  },
  // Actions column
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const task = row.original;
      return <TaskActions task={task} />;
    },
    enableHiding: false,
  },
];
