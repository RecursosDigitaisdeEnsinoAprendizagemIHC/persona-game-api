import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserFinishedStep1629223939385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_finished_steps",
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
                    type: "int"
                },
                {
                    name: "step_id",
                    type: "int"
                },
                {
                    name: "time_to_finish",
                    type: "int"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FKStepUserFinishedSteps",
                    referencedTableName: "steps",
                    referencedColumnNames: ["id"],
                    columnNames: ["step_id"]
                },
                {
                    name: "FKUserUserFinishedSteps",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_finished_steps");
    }

}
