ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "post_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "post_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "author_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "author_id" SET NOT NULL;