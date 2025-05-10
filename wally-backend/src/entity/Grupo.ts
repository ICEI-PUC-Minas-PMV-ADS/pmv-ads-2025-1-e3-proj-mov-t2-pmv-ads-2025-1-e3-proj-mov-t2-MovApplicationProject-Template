import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "grupos" })
export class Grupo {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 100 })
    nome: string

    @Column({ type: "varchar", length: 255 })
    descricao: string

    @Column({ type: "varchar", length: 255, nullable: true })
    avatar_url: string

    @CreateDateColumn()
    data_criacao: Date

    @UpdateDateColumn({ nullable: true })
    data_atualizacao: Date

    @DeleteDateColumn({ nullable: true })
    data_exclusao: Date

}