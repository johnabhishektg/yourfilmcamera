CREATE TABLE `addresses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`line1` varchar(191),
	`line2` varchar(191),
	`city` varchar(191),
	`state` varchar(191),
	`postal_code` varchar(191),
	`country` varchar(191),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `addresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_preferences` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(191),
	`email` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`newsletter` boolean NOT NULL DEFAULT false,
	`marketing` boolean NOT NULL DEFAULT false,
	`transactional` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_preferences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`items` json DEFAULT ('null'),
	`quantity` int,
	`amount` decimal(10,2) NOT NULL DEFAULT '0',
	`stripe_payment_intent_id` varchar(191) NOT NULL,
	`stripe_payment_intent_status` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`address_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`stripe_account_id` varchar(191) NOT NULL,
	`stripe_account_created_at` int,
	`stripe_account_expires_at` int,
	`details_submitted` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` varchar(128) NOT NULL DEFAULT 'duy9tQ0',
	`user_id` varchar(191) NOT NULL,
	`stripe_subscription_id` varchar(191),
	`stripe_price_id` varchar(191),
	`stripe_customer_id` varchar(191),
	`stripe_current_period_end` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptions_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `carts` ADD `stripe_account_id` varchar(191);