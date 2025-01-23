ALTER TABLE "admin-dashboard_postCategory" RENAME TO "admin-dashboard_posts_to_categories";--> statement-breakpoint
ALTER TABLE "admin-dashboard_posts_to_categories" RENAME COLUMN "postId" TO "post_id";--> statement-breakpoint
ALTER TABLE "admin-dashboard_posts_to_categories" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "admin-dashboard_posts_to_categories" DROP CONSTRAINT "admin-dashboard_postCategory_postId_admin-dashboard_post_id_fk";
--> statement-breakpoint
ALTER TABLE "admin-dashboard_posts_to_categories" DROP CONSTRAINT "admin-dashboard_postCategory_categoryId_admin-dashboard_category_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin-dashboard_posts_to_categories" ADD CONSTRAINT "admin-dashboard_posts_to_categories_post_id_admin-dashboard_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."admin-dashboard_post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin-dashboard_posts_to_categories" ADD CONSTRAINT "admin-dashboard_posts_to_categories_category_id_admin-dashboard_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."admin-dashboard_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
