
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "usuarios" })
export class Usuario {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 120, unique: true })
    email: string

    @Column({ type: "varchar", length: 100 })
    nome: string

    @Column({ type: "varchar", length: 255 })
    senha: string

    @Column({ type: "varchar", length: 255, nullable: true })
    avatar_url: string

    @CreateDateColumn()
    data_criacao: Date

    @UpdateDateColumn({ nullable: true })
    data_atualizacao: Date

    @DeleteDateColumn({ nullable: true })
    data_exclusao: Date
}