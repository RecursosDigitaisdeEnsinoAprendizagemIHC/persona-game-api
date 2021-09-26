import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RewardLevelNullable1632695834974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "user_has_reward",
      "level",
      new TableColumn({
        name: "level",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "user_has_reward",
      "level",
      new TableColumn({
        name: "level",
        type: "varchar",
      })
    );
  }
}
