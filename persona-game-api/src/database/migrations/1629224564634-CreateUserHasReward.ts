import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserHasReward1629224564634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_has_reward",
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
                    name: "reward_id",
                    type: "int"
                },
                {
                    name: "level",
                    type: "varchar",
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
                    name: "FKRewardUserHasReward",
                    referencedTableName: "rewards",
                    referencedColumnNames: ["id"],
                    columnNames: ["reward_id"]
                },
                {
                    name: "FKUserUserHasReward",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_has_reward");
    }

}
