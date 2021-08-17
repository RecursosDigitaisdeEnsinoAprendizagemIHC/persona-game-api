import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStep1629223752254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "steps",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                },
                {
                    name: "phase_id",
                    type: "int"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "number",
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
                    name: "FKPhaseSteps",
                    referencedTableName: "phases",
                    referencedColumnNames: ["id"],
                    columnNames: ["phase_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("steps");
    }

}
