import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateChatbotsTable1733593765689 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Chatbots',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'behavior',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,

                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP'
                }
            ]
        }));

        await queryRunner.createForeignKey(
            'Chatbots',
            new TableForeignKey({
                columnNames: ['userId'], // Coluna na tabela atual
                referencedTableName: 'Users', // Tabela referenciada
                referencedColumnNames: ['id'], // Coluna referenciada
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Chatbots');

        const table = await queryRunner.getTable('Chatbots');
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('userId') !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey('Chatbots', foreignKey);
        }

        // Remover a tabela
        await queryRunner.dropTable('Chatbots');
    }
}
