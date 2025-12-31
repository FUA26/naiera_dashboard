"use client";

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useQueryStates } from "nuqs";
import * as React from "react";
import { searchParamsParsers } from "@/app/demo/table/search-params";

interface UseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  rowCount?: number;
}

export function useDataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  rowCount,
}: UseDataTableProps<TData, TValue>) {
  // URL State
  const [urlParams, setUrlParams] = useQueryStates(searchParamsParsers, {
    shallow: false, // Send to server
    throttleMs: 500,
  });

  // Local state for visibility and selection (client-only usually)
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Memoize pagination state from URL
  const pagination: PaginationState = React.useMemo(
    () => ({
      pageIndex: urlParams.page - 1,
      pageSize: urlParams.pageSize,
    }),
    [urlParams.page, urlParams.pageSize]
  );

  // Memoize sorting state from URL
  const sorting: SortingState = React.useMemo(() => {
    // Use the sort param from URL, which has a default of "createdAt.desc"
    const sortValue = urlParams.sort || "createdAt.desc";
    const [id, order] = sortValue.split(".");
    return [{ id, desc: order === "desc" }];
  }, [urlParams.sort]);

  // Memoize column filters from URL (including date filters)
  const columnFilters: ColumnFiltersState = React.useMemo(() => {
    const filters: ColumnFiltersState = [];
    if (urlParams.title) filters.push({ id: "title", value: urlParams.title });
    // Handle faceted filters (comma or dot separated in URL)
    if (urlParams.status)
      filters.push({ id: "status", value: urlParams.status.split(".") });
    if (urlParams.priority)
      filters.push({ id: "priority", value: urlParams.priority.split(".") });
    // Handle date filters
    if (urlParams.dateFrom || urlParams.dateTo) {
      filters.push({
        id: "createdAt",
        value: {
          from: urlParams.dateFrom ? new Date(urlParams.dateFrom) : undefined,
          to: urlParams.dateTo ? new Date(urlParams.dateTo) : undefined,
        },
      });
    }
    return filters;
  }, [
    urlParams.title,
    urlParams.status,
    urlParams.priority,
    urlParams.dateFrom,
    urlParams.dateTo,
  ]);

  // Callbacks to update URL
  const onPaginationChange = React.useCallback(
    (updaterOrValue: any) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(pagination)
          : updaterOrValue;

      setUrlParams({
        page: newPagination.pageIndex + 1,
        pageSize: newPagination.pageSize,
      });
    },
    [pagination, setUrlParams]
  );

  const onSortingChange = React.useCallback(
    (updaterOrValue: any) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;

      const sortItem = newSorting[0];
      if (sortItem) {
        setUrlParams({
          sort: `${sortItem.id}.${sortItem.desc ? "desc" : "asc"}`,
        });
      } else {
        setUrlParams({ sort: null });
      }
    },
    [sorting, setUrlParams]
  );

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: any) => {
      const newFilters =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnFilters)
          : updaterOrValue;

      const titleFilter = newFilters.find((f: any) => f.id === "title")?.value;
      const statusFilter = newFilters.find(
        (f: any) => f.id === "status"
      )?.value;
      const priorityFilter = newFilters.find(
        (f: any) => f.id === "priority"
      )?.value;
      const dateFilter = newFilters.find(
        (f: any) => f.id === "createdAt"
      )?.value;

      // Prepare date filter values
      let dateFrom: string | null = null;
      let dateTo: string | null = null;

      if (dateFilter && typeof dateFilter === "object") {
        if (dateFilter.from) {
          dateFrom = dateFilter.from.toISOString().split("T")[0];
        }
        if (dateFilter.to) {
          dateTo = dateFilter.to.toISOString().split("T")[0];
        }
      }

      setUrlParams({
        title: (titleFilter as string) || null,
        // Join arrays for URL
        status: Array.isArray(statusFilter)
          ? statusFilter.join(".")
          : (statusFilter as string) || null,
        priority: Array.isArray(priorityFilter)
          ? priorityFilter.join(".")
          : (priorityFilter as string) || null,
        dateFrom,
        dateTo,
        page: 1, // Reset page on filter change
      });
    },
    [columnFilters, setUrlParams]
  );

  // TanStack Table Instance
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount, // Server-side page count
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true, // Handle filtering on server
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}
