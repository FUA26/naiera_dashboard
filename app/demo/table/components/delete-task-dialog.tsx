"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IconAlertTriangle, IconLoader2 } from "@tabler/icons-react";
import { Task } from "@/db/schema";
import { deleteTask } from "../actions";
import { toast } from "sonner";

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onDeleted?: () => void;
}

export function DeleteTaskDialog({
  open,
  onOpenChange,
  task,
  onDeleted,
}: DeleteTaskDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const hasCompletedRef = React.useRef(false);

  // Reset ref when dialog opens
  React.useEffect(() => {
    if (open) {
      hasCompletedRef.current = false;
      setIsDeleting(false);
    }
  }, [open]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (hasCompletedRef.current) return;

    setIsDeleting(true);

    try {
      await deleteTask({ id: task.id });

      // Mark as completed to prevent any re-render issues
      hasCompletedRef.current = true;

      // Show success toast immediately
      toast.success("Task berhasil dihapus!", {
        description: `Task "${task.title}" telah dihapus dari sistem.`,
      });

      // Close dialog immediately
      onOpenChange(false);

      // Delay refresh to ensure dialog is fully closed
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Refresh in background
      router.refresh();

      onDeleted?.();
    } catch (error) {
      hasCompletedRef.current = false;
      toast.error("Gagal menghapus task", {
        description:
          "Terjadi kesalahan saat menghapus task. Silakan coba lagi.",
      });
      setIsDeleting(false);
    }
  };

  // Prevent dialog from showing if action completed
  if (hasCompletedRef.current && !open) {
    return null;
  }

  return (
    <AlertDialog
      open={open && !hasCompletedRef.current}
      onOpenChange={(newOpen) => {
        if (!hasCompletedRef.current) {
          onOpenChange(newOpen);
        }
      }}
    >
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <IconAlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
          </div>
          <div className="space-y-2 text-center">
            <AlertDialogTitle className="text-xl">Hapus Task?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Anda akan menghapus task{" "}
              <span className="text-foreground font-semibold">
                &ldquo;{task.title}&rdquo;
              </span>
              <br />
              <span className="mt-1 inline-block text-sm text-red-600 dark:text-red-400">
                Tindakan ini tidak dapat dibatalkan.
              </span>
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 gap-2 sm:justify-center">
          <AlertDialogCancel disabled={isDeleting} className="sm:w-32">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600 sm:w-32"
          >
            {isDeleting ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Ya, Hapus"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
