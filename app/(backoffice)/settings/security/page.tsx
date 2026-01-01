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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  IconShield,
  IconKey,
  IconLock,
  IconDeviceFloppy,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconRefresh,
} from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock session data
const activeSessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "Jakarta, Indonesia",
    ip: "192.168.1.xxx",
    lastActive: "Active now",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "Bandung, Indonesia",
    ip: "192.168.2.xxx",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: 3,
    device: "Firefox on MacOS",
    location: "Surabaya, Indonesia",
    ip: "192.168.3.xxx",
    lastActive: "1 day ago",
    current: false,
  },
];

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account security and authentication
        </p>
      </div>

      {/* Security Status */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
            <IconShield className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-green-700 dark:text-green-400">
              Account Security: Strong
            </h3>
            <p className="text-sm text-green-600 dark:text-green-500">
              Your account is well protected with 2FA enabled
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconKey className="h-5 w-5" />
              Password
            </CardTitle>
            <CardDescription>
              Update your password regularly for better security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <Button className="w-full">
              <IconRefresh className="mr-2 h-4 w-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLock className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="font-medium">Authenticator App</p>
                <p className="text-muted-foreground text-sm">
                  Use Google Authenticator or similar
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700">
                <IconCheck className="mr-1 h-3 w-3" />
                Enabled
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="font-medium">SMS Verification</p>
                <p className="text-muted-foreground text-sm">
                  Receive codes via text message
                </p>
              </div>
              <Badge variant="secondary">
                <IconX className="mr-1 h-3 w-3" />
                Disabled
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="font-medium">Backup Codes</p>
                <p className="text-muted-foreground text-sm">
                  8 codes remaining
                </p>
              </div>
              <Button variant="outline" size="sm">
                View Codes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Options */}
      <Card>
        <CardHeader>
          <CardTitle>Security Options</CardTitle>
          <CardDescription>
            Configure additional security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Login Notifications</Label>
              <p className="text-muted-foreground text-sm">
                Get notified when someone logs into your account
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Unknown Device Alerts</Label>
              <p className="text-muted-foreground text-sm">
                Alert me when login from new device
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-muted-foreground text-sm">
                Automatically logout after 30 minutes of inactivity
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Devices currently logged into your account
              </CardDescription>
            </div>
            <Button variant="destructive" size="sm">
              <IconAlertTriangle className="mr-2 h-4 w-4" />
              End All Sessions
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <Badge className="bg-green-100 text-green-700">
                          Current
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {session.ip}
                  </TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                      >
                        End
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <IconDeviceFloppy className="mr-2 h-4 w-4" />
          Save Security Settings
        </Button>
      </div>
    </div>
  );
}
