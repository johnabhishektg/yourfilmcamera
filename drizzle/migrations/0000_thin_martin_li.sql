CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`boolean` boolean,
	`images` json DEFAULT ('null'),
	`category` enum('cameras','lens','film rolls') NOT NULL DEFAULT 'cameras',
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`full_name` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
