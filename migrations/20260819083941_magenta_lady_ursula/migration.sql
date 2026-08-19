CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL
);
