ALTER TABLE "admin-dashboard_comment" ADD COLUMN "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin-dashboard_comment" ADD COLUMN "updated_at" timestamp with time zone;