CREATE TABLE `otps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`otp` int NOT NULL,
	`otpExpiry` datetime NOT NULL,
	`userId` int NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `otps_id` PRIMARY KEY(`id`),
	CONSTRAINT `userId_idx` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `otps` ADD CONSTRAINT `otps_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;