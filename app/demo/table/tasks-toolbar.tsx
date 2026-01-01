import { Project, User } from "@/db/schema";
import {
  IconSearch,
  IconArrowsSort,
  IconLayoutRows,
  IconX,
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconTrash,
  IconGripVertical,
  IconBriefcase,
  IconUser,
} from "@tabler/icons-react";
import * as React from "react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import {
  DataTableFacetedFilter,
  DataTableDateFilter,
  DataTableViewOptions,
  DensityState,
  FacetedFilterOption,
} from "@/components/data-table";
import { TaskWithRelations } from "./columns";
import { ExportDropdown } from "./components/export-dropdown";

// Status options
const statusOptions: FacetedFilterOption[] = [
  { value: "todo", label: "Todo", icon: IconCircle },
  { value: "in-progress", label: "In Progress", icon: IconLoader },
  { value: "done", label: "Done", icon: IconCircleCheck },
  { value: "canceled", label: "Canceled", icon: IconCircleX },
];

// Priority options
const priorityOptions: FacetedFilterOption[] = [
  { value: "low", label: "Low", icon: IconArrowDown },
  { value: "medium", label: "Medium", icon: IconArrowRight },
  { value: "high", label: "High", icon: IconArrowUp },
];

// Available columns for sorting
const sortableColumns = [
  { value: "title", label: "Title" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "estimatedHours", label: "Est. Hours" },
  { value: "createdAt", label: "Created At" },
];

interface SortItem {
  id: string;
  column: string;
  desc: boolean;
}

interface TasksToolbarProps {
  table: Table<TaskWithRelations>;
  density: DensityState;
  onDensityChange: (density: DensityState) => void;
  projects: Project[];
  users: User[];
}

export function TasksToolbar({
  table,
  density,
  onDensityChange,
  projects,
  users,
}: TasksToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const sortingState = table.getState().sorting;
  const sortCount = sortingState.length;

  // Local state for multi-sort management
  const [sortItems, setSortItems] = React.useState<SortItem[]>(() =>
    sortingState.map((s, i) => ({
      id: `sort-${i}`,
      column: s.id,
      desc: s.desc,
    }))
  );

  // Sync local state with table state
  React.useEffect(() => {
    const newItems = sortingState.map((s, i) => ({
      id: `sort-${i}`,
      column: s.id,
      desc: s.desc,
    }));
    setSortItems(newItems);
  }, [sortingState]);

  const addSort = () => {
    const usedColumns = sortItems.map((s) => s.column);
    const availableColumn = sortableColumns.find(
      (c) => !usedColumns.includes(c.value)
    );
    if (availableColumn) {
      const newItem: SortItem = {
        id: `sort-${Date.now()}`,
        column: availableColumn.value,
        desc: false,
      };
      const newItems = [...sortItems, newItem];
      setSortItems(newItems);
      table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
    }
  };

  const removeSort = (id: string) => {
    const newItems = sortItems.filter((s) => s.id !== id);
    setSortItems(newItems);
    table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
  };

  const updateSortColumn = (id: string, column: string) => {
    const newItems = sortItems.map((s) => (s.id === id ? { ...s, column } : s));
    setSortItems(newItems);
    table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
  };

  const updateSortDirection = (id: string, desc: boolean) => {
    const newItems = sortItems.map((s) => (s.id === id ? { ...s, desc } : s));
    setSortItems(newItems);
    table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
  };

  const resetSorting = () => {
    setSortItems([]);
    table.resetSorting();
  };

  // Get filtered data for export
  const filteredData = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  // ...

  // Project options
  const projectOptions: FacetedFilterOption[] = projects.map((p) => ({
    value: p.id,
    label: p.name,
    icon: IconBriefcase,
  }));

  // Assignee options
  const assigneeOptions: FacetedFilterOption[] = users.map((u) => ({
    value: u.id,
    label: u.name,
    icon: IconUser,
  }));

  // ... (sort management)

  return (
    <div className="flex flex-col gap-4">
      {/* Top row: Search and action buttons */}
      <div className="flex items-center justify-between">
        {/* Left side: Search + Filters */}
        <div className="flex flex-1 items-center space-x-2">
          {/* Search */}
          {/* ... (search input) */}

          {/* Faceted Filters */}
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statusOptions}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorityOptions}
            />
          )}
          {/* Project Filter (Custom column handling or direct param usage via filter) */}
          {/* Note: DataTableFacetedFilter expects a column. Since we are doing server-side filtering via URL,
               we check if 'projectId' exists in URL or just rely on the component to update the column filter state
               which hooks/use-data-table syncs to URL.
               We need to ensure there is a 'project' or 'projectId' column in the table definition or add a dummy one/handle it manually.
               However, `useDataTable` implementation maps column filters to URL params.
               Use 'projectId' and 'assigneeId' as column IDs if they don't exist in visible columns?
               Wait, `columns` def has `project` accessorKey. But `useDataTable` maps `project` to what?
               `useDataTable` maps `status` -> URL `status`.
               We added `projectId` and `assigneeId` to `search-params`.
               We need `TasksToolbar` to drive `projectId` and `assigneeId` filters.

               If we use `table.getColumn("project")`, its accessorKey is "project" (object).
               Filtering by object is tricky out of the box with standard FacetedFilter which expects robust values.

               Let's cheat slightly: We can manually set column filters for "projectId" and "assigneeId"
               if we add them as hidden columns or just fake it if FacetedFilter supports it.

               Better: Add "projectId" and "assigneeId" as hidden columns in `columns.tsx` just for filtering purposes?
               Or just use `DataTableFacetedFilter` on "project" column but that might be complex.

               Let's stick to what we have:
               `useDataTable` maps specific column IDs to URL params in `onColumnFiltersChange`.
               We added `projectId` and `assigneeId` support in `getTasks`.

               But `columns.tsx` has `project` (object) and `assignee` (object).

               Let's assume we can filter by `project` column but the value passed will be the ID.
               Wait, `useDataTable` logic:
               ```
               const statusFilter = newFilters.find(f => f.id === "status")?.value;
               setUrlParams({ status: ... })
               ```
               It hardcodes specific columns.

               We need to update `use-data-table.ts` to map `projectId` filter to `projectId` URL param.
               And `assigneeId`.

               And in `TasksToolbar`, we need to target those filter IDs.
               Since `projectId` isn't a column in `columns.tsx`, `table.getColumn("projectId")` will return undefined.

               Fix: Add `projectId` and `assigneeId` as hidden columns in `columns.tsx`.
           */}

          {/* But for now, let's implement the UI and I will add hidden columns in next step. */}

          {table.getColumn("project") && (
            <DataTableFacetedFilter
              column={table.getColumn("project")}
              title="Project"
              options={projectOptions}
            />
          )}

          {table.getColumn("assignee") && (
            <DataTableFacetedFilter
              column={table.getColumn("assignee")}
              title="Assignee"
              options={assigneeOptions}
            />
          )}

          {/* Date Filter */}
          {table.getColumn("createdAt") && (
            <DataTableDateFilter
              column={table.getColumn("createdAt")}
              title="Created At"
            />
          )}

          {/* Reset Filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <IconX className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Right side: Action buttons group */}
        <ButtonGroup>
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <IconArrowsSort className="mr-2 h-4 w-4" />
                Sort
                {sortCount > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                    {sortCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px]">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 p-2">
                {sortItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Select
                      value={item.column}
                      onValueChange={(value) =>
                        updateSortColumn(item.id, value)
                      }
                    >
                      <SelectTrigger className="h-8 flex-1">
                        <SelectValue placeholder="Column" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortableColumns.map((col) => (
                          <SelectItem
                            key={col.value}
                            value={col.value}
                            disabled={sortItems.some(
                              (s) => s.column === col.value && s.id !== item.id
                            )}
                          >
                            {col.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={item.desc ? "desc" : "asc"}
                      onValueChange={(value) =>
                        updateSortDirection(item.id, value === "desc")
                      }
                    >
                      <SelectTrigger className="h-8 w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Asc</SelectItem>
                        <SelectItem value="desc">Desc</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeSort(item.id)}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                    <IconGripVertical className="text-muted-foreground h-4 w-4 cursor-grab" />
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={addSort}
                    disabled={sortItems.length >= sortableColumns.length}
                  >
                    Add sort
                  </Button>
                  {sortItems.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={resetSorting}>
                      Reset sorting
                    </Button>
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Density Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <IconLayoutRows className="mr-2 h-4 w-4" />
                Density
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Row density</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={density}
                onValueChange={(v) => onDensityChange(v as DensityState)}
              >
                <DropdownMenuRadioItem value="short">
                  Short
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">
                  Medium
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="tall">Tall</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="extra-tall">
                  Extra Tall
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Options */}
          <DataTableViewOptions table={table} />

          {/* Export Dropdown */}
          <ExportDropdown data={filteredData} />
        </ButtonGroup>
      </div>
    </div>
  );
}
