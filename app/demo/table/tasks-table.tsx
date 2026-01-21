"use client";

import * as React from "react";
import {
  DataTableContent,
  DataTableActionBar,
  type DensityState,
  type DataTableInstance,
} from "@/components/dashboard/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { columns, type TaskWithRelations } from "./columns";
import { TasksToolbar } from "./tasks-toolbar";
import { TasksActionBarContent } from "./tasks-action-bar";
import { Table } from "@tanstack/react-table";
import { Project, User } from "@/db/schema";

interface TasksTableProps {
  data: TaskWithRelations[];
  pageCount: number;
  projects: Project[];
  users: User[];
}

export function TasksTable({
  data,
  pageCount,
  projects,
  users,
}: TasksTableProps) {
  const table = useDataTable({
    data,
    columns,
    pageCount,
  });

  return (
    <DataTableContent
      table={table}
      columns={columns}
      toolbar={(table, density, onDensityChange) => (
        <TasksToolbar
          table={table as any} // Temporary cast until Toolbar is updated
          density={density}
          onDensityChange={onDensityChange}
          projects={projects}
          users={users}
        />
      )}
      actionBar={(table) => (
        <DataTableActionBar table={table}>
          {(selectedRows, resetSelection) => (
            <TasksActionBarContent
              selectedRows={selectedRows as TaskWithRelations[]}
              resetSelection={resetSelection}
            />
          )}
        </DataTableActionBar>
      )}
    />
  );
}
