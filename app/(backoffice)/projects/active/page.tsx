import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  IconBriefcase,
  IconClock,
  IconListCheck,
  IconUsers,
} from "@tabler/icons-react";
import { getProjects } from "@/app/demo/table/actions";

export default async function ActiveProjectsPage() {
  const allProjects = await getProjects();
  const activeProjects = allProjects.filter((p) => p.status === "active");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Active Projects</h1>
        <p className="text-muted-foreground mt-1">
          Projects currently in progress
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">
              {activeProjects.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects List */}
      <div className="space-y-4">
        {activeProjects.map((project) => (
          <Card key={project.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                {/* Project Icon */}
                <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
                  <IconBriefcase className="text-primary h-7 w-7" />
                </div>

                {/* Project Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-lg font-semibold">
                      {project.name}
                    </h3>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </Badge>
                  </div>
                  <p className="text-muted-foreground truncate text-sm">
                    {project.description || "No description"}
                  </p>
                </div>

                {/* Progress */}
                <div className="hidden w-48 space-y-2 md:block">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                {/* Team */}
                <div className="hidden items-center gap-4 lg:flex">
                  <div className="flex -space-x-2">
                    {["John", "Jane", "Admin"].map((name, i) => (
                      <Avatar
                        key={i}
                        className="border-background h-8 w-8 border-2"
                      >
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                        />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {activeProjects.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <IconBriefcase className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="text-lg font-semibold">No Active Projects</h3>
              <p className="text-muted-foreground">
                Create a new project to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
