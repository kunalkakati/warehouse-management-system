ALTER TABLE "user" DROP CONSTRAINT "user_godown_code_godowns_code_fk";
--> statement-breakpoint
ALTER TABLE "depositors" ALTER COLUMN "godown_code" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_godown_code_godowns_code_fk" FOREIGN KEY ("godown_code") REFERENCES "public"."godowns"("code") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_employee_id_uidx" ON "user" USING btree ("employee_id");--> statement-breakpoint
ALTER TABLE "goods_inward" ADD CONSTRAINT "goods_inward_weights_check" CHECK ("goods_inward"."gross_weight_kg" >= "goods_inward"."tare_weight_kg");--> statement-breakpoint
ALTER TABLE "goods_inward" ADD CONSTRAINT "goods_inward_quantities_check" CHECK ("goods_inward"."net_weight_kg" >= 0 AND "goods_inward"."bag_count" >= 0);