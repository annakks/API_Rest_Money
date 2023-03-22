import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679483135580 implements MigrationInterface {
    name = 'default1679483135580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" text NOT NULL, "name" text NOT NULL, "value" numeric NOT NULL, "date" date NOT NULL, "observation" text NOT NULL, "record_id" uuid, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_6a9b1be47e6af9167a2ec10cd4d" FOREIGN KEY ("record_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_6a9b1be47e6af9167a2ec10cd4d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "records"`);
    }

}
