import {MigrationInterface, QueryRunner} from "typeorm";

export class addAccount1611511996494 implements MigrationInterface {
    name = 'addAccount1611511996494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" date, "updatedAt" date, "providerType" varchar NOT NULL, "providerId" varchar NOT NULL, "providerAccountId" varchar NOT NULL, "refreshToken" varchar NOT NULL, "accessToken" varchar NOT NULL, "accessTokenExpires" datetime, "password" varchar(256), "userId" integer, CONSTRAINT "REL_3aa23c0a6d107393e8b40e3e2a" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE INDEX "accountProviderId" ON "accounts" ("providerId") `);
        await queryRunner.query(`CREATE INDEX "accountProviderAccountId" ON "accounts" ("providerAccountId") `);
        await queryRunner.query(`DROP INDEX "accountProviderId"`);
        await queryRunner.query(`DROP INDEX "accountProviderAccountId"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" date, "updatedAt" date, "providerType" varchar NOT NULL, "providerId" varchar NOT NULL, "providerAccountId" varchar NOT NULL, "refreshToken" varchar NOT NULL, "accessToken" varchar NOT NULL, "accessTokenExpires" datetime, "password" varchar(256), "userId" integer, CONSTRAINT "REL_3aa23c0a6d107393e8b40e3e2a" UNIQUE ("userId"), CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "createdAt", "updatedAt", "providerType", "providerId", "providerAccountId", "refreshToken", "accessToken", "accessTokenExpires", "password", "userId") SELECT "id", "createdAt", "updatedAt", "providerType", "providerId", "providerAccountId", "refreshToken", "accessToken", "accessTokenExpires", "password", "userId" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
        await queryRunner.query(`CREATE INDEX "accountProviderId" ON "accounts" ("providerId") `);
        await queryRunner.query(`CREATE INDEX "accountProviderAccountId" ON "accounts" ("providerAccountId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "accountProviderAccountId"`);
        await queryRunner.query(`DROP INDEX "accountProviderId"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" date, "updatedAt" date, "providerType" varchar NOT NULL, "providerId" varchar NOT NULL, "providerAccountId" varchar NOT NULL, "refreshToken" varchar NOT NULL, "accessToken" varchar NOT NULL, "accessTokenExpires" datetime, "password" varchar(256), "userId" integer, CONSTRAINT "REL_3aa23c0a6d107393e8b40e3e2a" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "createdAt", "updatedAt", "providerType", "providerId", "providerAccountId", "refreshToken", "accessToken", "accessTokenExpires", "password", "userId") SELECT "id", "createdAt", "updatedAt", "providerType", "providerId", "providerAccountId", "refreshToken", "accessToken", "accessTokenExpires", "password", "userId" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`CREATE INDEX "accountProviderAccountId" ON "accounts" ("providerAccountId") `);
        await queryRunner.query(`CREATE INDEX "accountProviderId" ON "accounts" ("providerId") `);
        await queryRunner.query(`DROP INDEX "accountProviderAccountId"`);
        await queryRunner.query(`DROP INDEX "accountProviderId"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
