import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifiedAddressTable1748154855472 implements MigrationInterface {
    name = 'ModifiedAddressTable1748154855472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "houseno" integer NOT NULL default 0`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "houseno"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "pincode" string varying NOT NULL`);
    }

}
