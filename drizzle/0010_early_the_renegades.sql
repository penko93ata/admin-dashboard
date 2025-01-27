ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "post_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "post_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "author_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "admin-dashboard_comment" ALTER COLUMN "author_id" DROP NOT NULL;