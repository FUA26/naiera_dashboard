CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`status` text NOT NULL,
	`priority` text NOT NULL,
	`label` text NOT NULL,
	`estimated_hours` integer NOT NULL,
	`created_at` integer NOT NULL
);
