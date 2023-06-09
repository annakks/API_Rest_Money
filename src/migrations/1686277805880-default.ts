import { MigrationInterface, QueryRunner } from "typeorm";

export class default1686277805880 implements MigrationInterface {
    name = 'default1686277805880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "id" TO "idUser"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" TO "PK_65e7c74bbeaca3cb19ae90bf6ee"`);
        await queryRunner.query(`ALTER SEQUENCE "users_id_seq" RENAME TO "users_idUser_seq"`);
        await queryRunner.query(`ALTER TABLE "records" RENAME COLUMN "id" TO "idRecord"`);
        await queryRunner.query(`ALTER TABLE "records" RENAME CONSTRAINT "PK_188149422ee2454660abf1d5ee5" TO "PK_79a35bace3a2aa38742a16cecf3"`);
        await queryRunner.query(`ALTER SEQUENCE "records_id_seq" RENAME TO "records_idRecord_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER SEQUENCE "records_idRecord_seq" RENAME TO "records_id_seq"`);
        await queryRunner.query(`ALTER TABLE "records" RENAME CONSTRAINT "PK_79a35bace3a2aa38742a16cecf3" TO "PK_188149422ee2454660abf1d5ee5"`);
        await queryRunner.query(`ALTER TABLE "records" RENAME COLUMN "idRecord" TO "id"`);
        await queryRunner.query(`ALTER SEQUENCE "users_idUser_seq" RENAME TO "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_65e7c74bbeaca3cb19ae90bf6ee" TO "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "idUser" TO "id"`);
    }

}
