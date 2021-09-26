import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RewardComboLog1632700080144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "question_combo",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "combo",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserQuestionCombo",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "step_combo",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "combo",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserStepCombo",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("question_combo");
    await queryRunner.dropTable("step_combo");
  }
}
