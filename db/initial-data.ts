import { Task } from "./schema";

// Generate realistic task titles
const taskTitles = [
  "If we calculate the bandwidth, we can get to the IB alarm through the cross-platform SSD transmitter!",
  "Bypassing the port won't do anything, we need to synthesize the 1080p EXE panel!",
  "We need to generate the cross-platform USB array!",
  "I'll index the bluetooth UDP driver, that should system the SMS system!",
  "I'll reboot the primary UTF8 protocol, that should panel the UTF8 pixel!",
  "I'll quantify the neural THX pixel, that should program the PNG array!",
  "Try to reboot the EXE interface, maybe it will parse the cross-platform circuit!",
  "Use the wireless JSON circuit, then you can parse the mobile microchip!",
  "Use the auxiliary CLI feed, then you can connect the open-source application!",
  "If we synthesize the circuit, we can get to the XSS capacitor through the cross-platform interface!",
  "The SAS application is down, copy the haptic system so we can reboot the API!",
  "You can't compress the driver without indexing the multi-byte HDD firewall!",
  "We need to transmit the bluetooth SMTP panel!",
  "Try to generate the RAM capacitor, maybe it will input the optical bus!",
  "I'll hack the online SSL capacitor, that should hard drive the ADP bandwidth!",
];

const statuses: Task["status"][] = ["todo", "in-progress", "done", "canceled"];
const priorities: Task["priority"][] = ["low", "medium", "high"];
const labels: Task["label"][] = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
];

// Generate mock tasks
function generateTasks(count: number): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const taskId = `TASK-${(1000 + i).toString()}`;
    const title = taskTitles[i % taskTitles.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const label = labels[Math.floor(Math.random() * labels.length)];
    const estimatedHours = Math.floor(Math.random() * 30) + 5;

    // Generate dates within December 2025
    const day = Math.floor(Math.random() * 30) + 1;
    const createdAt = new Date(2025, 11, day);

    tasks.push({
      id: taskId,
      title,
      status,
      priority,
      label,
      estimatedHours,
      createdAt,
    });
  }

  return tasks;
}

export const tasks: Task[] = generateTasks(100);
