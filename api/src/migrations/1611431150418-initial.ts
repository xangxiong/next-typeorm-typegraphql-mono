import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1611431150418 implements MigrationInterface {
    name = 'initial1611431150418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" date, "updatedAt" date, "name" varchar NOT NULL, "email" varchar NOT NULL, "emailVerified" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
