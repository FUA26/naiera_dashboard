"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconDotsVertical,
  IconCopy,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import { Task } from "@/db/schema";
import { DeleteTaskDialog } from "./delete-task-dialog";
import { EditTaskDialog } from "./edit-task-dialog";
import { ViewTaskSheet } from "./view-task-sheet";
import { toast } from "sonner";

interface TaskActionsProps {
  task: Task;
  onTaskUpdated?: () => void;
}

export function TaskActions({ task, onTaskUpdated }: TaskActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [viewSheetOpen, setViewSheetOpen] = React.useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(task.id);
    toast.success("Task ID berhasil disalin!", {
      description: `ID: ${task.id}`,
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyId}>
            <IconCopy className="mr-2 h-4 w-4" />
            Copy Task ID
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <IconEdit className="mr-2 h-4 w-4" />
            Edit Task
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setViewSheetOpen(true)}>
            <IconEye className="mr-2 h-4 w-4" />
            View Details
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <IconTrash className="mr-2 h-4 w-4" />
            Delete Task
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <DeleteTaskDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        task={task}
        onDeleted={onTaskUpdated}
      />

      {/* Edit Task Dialog */}
      <EditTaskDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        task={task}
        onUpdated={onTaskUpdated}
      />

      {/* View Task Details Sheet */}
      <ViewTaskSheet
        open={viewSheetOpen}
        onOpenChange={setViewSheetOpen}
        task={task}
      />
    </>
  );
}
