import { MigrationInterface, QueryRunner } from "typeorm";

export class Line1AndLine2AddedToTheAddress1748190859545 implements MigrationInterface {
    name = 'Line1AndLine2AddedToTheAddress1748190859545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line_1" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line_2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "houseno" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line_2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line_1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
    }

}
