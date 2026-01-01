"use client";

import * as React from "react";
import {
  IconTrash,
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TaskWithRelations } from "./columns";
import { deleteTasks, updateTaskStatus } from "./actions";
import { toast } from "sonner"; // Assuming sonner is installed, or use basic alert

interface TasksActionBarContentProps {
  selectedRows: TaskWithRelations[];
  resetSelection: () => void;
}

export function TasksActionBarContent({
  selectedRows,
  resetSelection,
}: TasksActionBarContentProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const ids = selectedRows.map((task) => task.id);
      await deleteTasks({ ids });
      toast.success("Tasks deleted");
      resetSelection();
    });
  };

  const handleStatusChange = (status: string) => {
    startTransition(async () => {
      const ids = selectedRows.map((task) => task.id);
      await updateTaskStatus({ ids, status });
      toast.success("Tasks updated");
      resetSelection();
    });
  };

  return (
    <>
      {/* Status update */}
      <Select onValueChange={handleStatusChange} disabled={isPending}>
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">
            <div className="flex items-center gap-2">
              <IconCircle className="h-4 w-4" />
              Todo
            </div>
          </SelectItem>
          <SelectItem value="in-progress">
            <div className="flex items-center gap-2">
              <IconLoader className="h-4 w-4" />
              In Progress
            </div>
          </SelectItem>
          <SelectItem value="done">
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-4 w-4" />
              Done
            </div>
          </SelectItem>
          <SelectItem value="canceled">
            <div className="flex items-center gap-2">
              <IconCircleX className="h-4 w-4" />
              Canceled
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Delete action */}
      <Button
        variant="destructive"
        size="sm"
        className="h-8"
        onClick={handleDelete}
        disabled={isPending}
      >
        <IconTrash className="mr-2 h-4 w-4" />
        {isPending ? "Deleting..." : "Delete"}
      </Button>

      <Separator orientation="vertical" className="h-6" />
    </>
  );
}
