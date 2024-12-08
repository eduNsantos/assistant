import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { DefaultEntity } from './DefaultEntity';

@Entity("Chatbots") // Nome da tabela no banco de dados
export class User extends DefaultEntity {
    @PrimaryGeneratedColumn() // Gera automaticamente a coluna ID
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false }) // Define a coluna 'name' como varchar
    name: string;

    @Column({ type: 'text', unique: true, nullable: false }) // 'email' deve ser único
    behavior: string;



    // constructor(id: number, name: string, email: string, password: string) {
    //     super();
    // };
}
