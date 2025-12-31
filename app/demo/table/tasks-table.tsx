"use client";

import * as React from "react";
import {
  DataTableContent,
  DataTableActionBar,
  type DensityState,
  type DataTableInstance,
} from "@/components/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { columns } from "./columns";
import { TasksToolbar } from "./tasks-toolbar";
import { TasksActionBarContent } from "./tasks-action-bar";
import { type Task } from "@/db/schema";
import { Table } from "@tanstack/react-table";

interface TasksTableProps {
  data: Task[];
  pageCount: number;
}

export function TasksTable({ data, pageCount }: TasksTableProps) {
  const table = useDataTable({
    data,
    columns,
    pageCount,
  });

  return (
    <DataTableContent
      table={table as Table<Task>}
      columns={columns}
      toolbar={(table, density, onDensityChange) => (
        <TasksToolbar
          table={table as Table<Task>}
          density={density}
          onDensityChange={onDensityChange}
        />
      )}
      actionBar={(table) => (
        <DataTableActionBar table={table}>
          {(selectedRows, resetSelection) => (
            <TasksActionBarContent
              selectedRows={selectedRows as Task[]}
              resetSelection={resetSelection}
            />
          )}
        </DataTableActionBar>
      )}
    />
  );
}
