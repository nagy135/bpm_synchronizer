import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntities1632988200028 implements MigrationInterface {
  name = 'CreateEntities1632988200028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "nft_ends" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "item_id" integer NOT NULL, "end_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "nft_item_id" uuid, CONSTRAINT "PK_b77956c3d5f5a3d75358344c866" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "nft_collections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "title_image_storage_id" character varying NOT NULL, "story_video_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "nft_creator_id" uuid, CONSTRAINT "PK_fc1b262811ac2650e01dab48fe5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "nft_creators" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying NOT NULL, "title_image_storage_id" character varying NOT NULL, "bio" character varying NOT NULL, "social_links" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_62f9ec7a40e5ab66dcd7a636f0b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "nft_buys_state_enum" AS ENUM('paid', 'pending', 'cancelled')`
    );
    await queryRunner.query(
      `CREATE TYPE "nft_buys_payment_type_enum" AS ENUM('paypal', 'wexo')`
    );
    await queryRunner.query(
      `CREATE TABLE "nft_buys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" character varying NOT NULL, "state" "nft_buys_state_enum" NOT NULL DEFAULT 'pending', "payment_type" "nft_buys_payment_type_enum" NOT NULL DEFAULT 'paypal', "payment_data" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "nft_item_id" uuid, "nft_buyer_id" uuid, CONSTRAINT "PK_d116371c1e5a8e580e511e161fc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "nft_items_state_enum" AS ENUM('sold', 'active', 'prepared')`
    );
    await queryRunner.query(
      `CREATE TYPE "nft_items_type_enum" AS ENUM('auction', 'buy')`
    );
    await queryRunner.query(
      `CREATE TABLE "nft_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "contact_address" character varying NOT NULL, "mime_type" character varying NOT NULL, "currency" character varying NOT NULL, "storage_id" character varying NOT NULL, "amount" character varying NOT NULL, "state" "nft_items_state_enum" NOT NULL DEFAULT 'prepared', "type" "nft_items_type_enum" NOT NULL DEFAULT 'buy', "profit_distribution" jsonb NOT NULL, "issued" integer NOT NULL, "metadata" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "nft_creator_id" uuid, "nft_collection_id" uuid, CONSTRAINT "PK_8e3a3c9a55bd9d90699ad92b76a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "nft_bids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "nft_item_id" uuid, "buyer_id" uuid, CONSTRAINT "PK_d70f66deb909ca0f8f7bbaf6e69" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_ends" ADD CONSTRAINT "FK_308fab53f67c842af5e361088b3" FOREIGN KEY ("nft_item_id") REFERENCES "nft_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_collections" ADD CONSTRAINT "FK_d3033feacd79513fee0bd13705e" FOREIGN KEY ("nft_creator_id") REFERENCES "nft_creators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_buys" ADD CONSTRAINT "FK_0c479720505454cfdf171d8469b" FOREIGN KEY ("nft_item_id") REFERENCES "nft_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_buys" ADD CONSTRAINT "FK_e45f0d707083a0b8e85bf7d0576" FOREIGN KEY ("nft_buyer_id") REFERENCES "nft_creators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_items" ADD CONSTRAINT "FK_39c18596ef9b0bba669b92a2180" FOREIGN KEY ("nft_creator_id") REFERENCES "nft_creators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_items" ADD CONSTRAINT "FK_9b7ba180d06178bd098d862517c" FOREIGN KEY ("nft_collection_id") REFERENCES "nft_collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_bids" ADD CONSTRAINT "FK_9b3dcd281a2c6a409bf40d28052" FOREIGN KEY ("nft_item_id") REFERENCES "nft_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_bids" ADD CONSTRAINT "FK_38c2c5cf6d92deda1bcda3b9935" FOREIGN KEY ("buyer_id") REFERENCES "nft_creators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "nft_bids" DROP CONSTRAINT "FK_38c2c5cf6d92deda1bcda3b9935"`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_bids" DROP CONSTRAINT "FK_9b3dcd281a2c6a409bf40d28052"`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_items" DROP CONSTRAINT "FK_9b7ba180d06178bd098d862517c"`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_items" DROP CONSTRAINT "FK_39c18596ef9b0bba669b92a2180"`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_buys" DROP CONSTRAINT "FK_e45f0d707083a0b8e85bf7d0576"`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_buys" DROP CONSTRAINT "FK_0c479720505454cfdf171d8469b"`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_collections" DROP CONSTRAINT "FK_d3033feacd79513fee0bd13705e"`
    );
    await queryRunner.query(
      `ALTER TABLE "nft_ends" DROP CONSTRAINT "FK_308fab53f67c842af5e361088b3"`
    );
    await queryRunner.query(`DROP TABLE "nft_bids"`);
    await queryRunner.query(`DROP TABLE "nft_items"`);
    await queryRunner.query(`DROP TYPE "nft_items_type_enum"`);
    await queryRunner.query(`DROP TYPE "nft_items_state_enum"`);
    await queryRunner.query(`DROP TABLE "nft_buys"`);
    await queryRunner.query(`DROP TYPE "nft_buys_payment_type_enum"`);
    await queryRunner.query(`DROP TYPE "nft_buys_state_enum"`);
    await queryRunner.query(`DROP TABLE "nft_creators"`);
    await queryRunner.query(`DROP TABLE "nft_collections"`);
    await queryRunner.query(`DROP TABLE "nft_ends"`);
  }
}
