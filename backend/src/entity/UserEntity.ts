import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { DefaultEntity } from './DefaultEntity';

@Entity("User") // Nome da tabela no banco de dados
export class User extends DefaultEntity {
    @PrimaryGeneratedColumn() // Gera automaticamente a coluna ID
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false }) // Define a coluna 'name' como varchar
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false }) // 'email' deve ser único
    email: string;

    @Column({ type: 'varchar', nullable: false }) // Coluna para armazenar a senha
    password: string;


    // constructor(id: number, name: string, email: string, password: string) {
    //     super();
    // };
}
