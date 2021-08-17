import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserStepsLog1629224096475 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_steps_log",
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
                    name: "current_step",
                    type: "boolean",
                    default: true
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
                    name: "FKStepUserStepsLog",
                    referencedTableName: "steps",
                    referencedColumnNames: ["id"],
                    columnNames: ["step_id"]
                },
                {
                    name: "FKUserUserStepsLog",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
