import { MigrationInterface, QueryRunner } from "typeorm";

export class Locale1628960563495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into locale (iso) values ("en");
        insert into locale (iso) values ("jp");
        insert into locale (iso) values ("id");
    `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
