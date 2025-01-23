CREATE TABLE IF NOT EXISTS "admin-dashboard_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "admin-dashboard_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin-dashboard_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin-dashboard_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(255) NOT NULL,
	"post_id" integer,
	"author_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin-dashboard_postCategory" (
	"postId" uuid NOT NULL,
	"categoryId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin-dashboard_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" varchar(255) NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin-dashboard_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin-dashboard_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin-dashboard_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "admin-dashboard_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin-dashboard_account" ADD CONSTRAINT "admin-dashboard_account_user_id_admin-dashboard_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."admin-dashboard_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin-dashboard_postCategory" ADD CONSTRAINT "admin-dashboard_postCategory_postId_admin-dashboard_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."admin-dashboard_post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin-dashboard_postCategory" ADD CONSTRAINT "admin-dashboard_postCategory_categoryId_admin-dashboard_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."admin-dashboard_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin-dashboard_post" ADD CONSTRAINT "admin-dashboard_post_created_by_admin-dashboard_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin-dashboard_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin-dashboard_session" ADD CONSTRAINT "admin-dashboard_session_user_id_admin-dashboard_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."admin-dashboard_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "admin-dashboard_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_by_idx" ON "admin-dashboard_post" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "admin-dashboard_post" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "admin-dashboard_session" USING btree ("user_id");