"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconPlus,
  IconShield,
  IconLock,
  IconEye,
  IconEdit,
  IconTrash,
  IconSettings,
} from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock permissions data
const permissionGroups = [
  {
    name: "Tasks",
    icon: IconSettings,
    permissions: [
      {
        id: "tasks.view",
        name: "View Tasks",
        description: "Can view all tasks",
      },
      {
        id: "tasks.create",
        name: "Create Tasks",
        description: "Can create new tasks",
      },
      {
        id: "tasks.edit",
        name: "Edit Tasks",
        description: "Can edit existing tasks",
      },
      {
        id: "tasks.delete",
        name: "Delete Tasks",
        description: "Can delete tasks",
      },
      {
        id: "tasks.assign",
        name: "Assign Tasks",
        description: "Can assign tasks to users",
      },
    ],
  },
  {
    name: "Projects",
    icon: IconSettings,
    permissions: [
      {
        id: "projects.view",
        name: "View Projects",
        description: "Can view all projects",
      },
      {
        id: "projects.create",
        name: "Create Projects",
        description: "Can create new projects",
      },
      {
        id: "projects.edit",
        name: "Edit Projects",
        description: "Can edit existing projects",
      },
      {
        id: "projects.delete",
        name: "Delete Projects",
        description: "Can delete projects",
      },
      {
        id: "projects.manage",
        name: "Manage Projects",
        description: "Full project management access",
      },
    ],
  },
  {
    name: "Users",
    icon: IconSettings,
    permissions: [
      {
        id: "users.view",
        name: "View Users",
        description: "Can view user list",
      },
      {
        id: "users.create",
        name: "Create Users",
        description: "Can create new users",
      },
      {
        id: "users.edit",
        name: "Edit Users",
        description: "Can edit user details",
      },
      {
        id: "users.delete",
        name: "Delete Users",
        description: "Can delete users",
      },
      {
        id: "users.roles",
        name: "Manage Roles",
        description: "Can assign roles to users",
      },
    ],
  },
  {
    name: "Settings",
    icon: IconSettings,
    permissions: [
      {
        id: "settings.view",
        name: "View Settings",
        description: "Can view system settings",
      },
      {
        id: "settings.edit",
        name: "Edit Settings",
        description: "Can modify system settings",
      },
      {
        id: "settings.security",
        name: "Security Settings",
        description: "Can manage security settings",
      },
    ],
  },
];

const roles = ["Administrator", "Manager", "User", "Viewer"];

export default function PermissionsPage() {
  const totalPermissions = permissionGroups.reduce(
    (acc, group) => acc + group.permissions.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
          <p className="text-muted-foreground mt-1">
            Configure role-based access control
          </p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Permission
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Permissions
            </CardTitle>
            <IconLock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPermissions}</div>
            <p className="text-muted-foreground text-xs">
              Across {permissionGroups.length} groups
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Permission Groups
            </CardTitle>
            <IconShield className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissionGroups.length}</div>
            <p className="text-muted-foreground text-xs">
              Categories of permissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles</CardTitle>
            <IconShield className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-muted-foreground text-xs">Configured roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions Matrix</CardTitle>
          <CardDescription>Configure permissions for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-2">
            {permissionGroups.map((group) => (
              <AccordionItem
                key={group.name}
                value={group.name}
                className="rounded-lg border px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                      <group.icon className="text-primary h-4 w-4" />
                    </div>
                    <span className="font-semibold">{group.name}</span>
                    <Badge variant="secondary">
                      {group.permissions.length} permissions
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Permission</TableHead>
                        {roles.map((role) => (
                          <TableHead key={role} className="text-center">
                            {role}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.permissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {permission.name}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                {permission.description}
                              </div>
                            </div>
                          </TableCell>
                          {roles.map((role, i) => (
                            <TableCell key={role} className="text-center">
                              <Checkbox
                                defaultChecked={
                                  i === 0 ||
                                  (i === 1 && !permission.id.includes("delete"))
                                }
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
