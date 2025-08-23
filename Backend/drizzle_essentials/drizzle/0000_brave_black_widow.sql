CREATE TABLE `otps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`otp` varchar(20) NOT NULL,
	`otpExpiry` datetime NOT NULL,
	`userId` int NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `otps_id` PRIMARY KEY(`id`),
	CONSTRAINT `userId_idx` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(50) NOT NULL,
	`description` varchar(100) NOT NULL,
	`priority` enum('Low Priority','Medium Priority','High Priority') NOT NULL,
	`status` enum('Pending','In Progress','Completed') NOT NULL DEFAULT 'Pending',
	`userId` int NOT NULL,
	`startingDate` datetime NOT NULL,
	`deadline` datetime NOT NULL,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `otps` ADD CONSTRAINT `otps_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;