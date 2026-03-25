CREATE TABLE `affiliate_clicks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`supplementId` int,
	`supplementSlug` varchar(128),
	`affiliatePartner` varchar(64) NOT NULL,
	`destinationUrl` text NOT NULL,
	`userId` int,
	`sessionId` varchar(64),
	`ipHash` varchar(64),
	`referrer` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `affiliate_clicks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(128),
	`source` varchar(64) DEFAULT 'lead_magnet',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_leads_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_leads_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `stack_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stackId` int NOT NULL,
	`supplementId` int NOT NULL,
	`dosageMg` float,
	`timing` varchar(64),
	`notes` text,
	`sortOrder` int DEFAULT 0,
	CONSTRAINT `stack_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stacks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`goal` varchar(64),
	`description` text,
	`isPublic` boolean DEFAULT false,
	`shareToken` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stacks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supplements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`name` varchar(128) NOT NULL,
	`category` varchar(64) NOT NULL,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`dosageMin` float,
	`dosageMax` float,
	`dosageUnit` varchar(16),
	`scoreEnergy` float DEFAULT 0,
	`scoreMood` float DEFAULT 0,
	`scoreMemory` float DEFAULT 0,
	`scoreFocus` float DEFAULT 0,
	`scoreCreativity` float DEFAULT 0,
	`scoreSleep` float DEFAULT 0,
	`scoreAnxiety` float DEFAULT 0,
	`affiliatePrimary` varchar(512),
	`affiliatePrimaryLabel` varchar(64),
	`affiliateSecondary` varchar(512),
	`affiliateSecondaryLabel` varchar(64),
	`affiliateAmazon` varchar(512),
	`imageUrl` varchar(512),
	`safetyRating` enum('very_safe','safe','moderate','caution') DEFAULT 'safe',
	`isPopular` boolean DEFAULT false,
	`isFeatured` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `supplements_id` PRIMARY KEY(`id`),
	CONSTRAINT `supplements_slug_unique` UNIQUE(`slug`)
);
