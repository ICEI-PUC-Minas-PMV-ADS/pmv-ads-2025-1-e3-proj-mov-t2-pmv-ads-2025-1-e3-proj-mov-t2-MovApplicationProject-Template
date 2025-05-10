
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity({ name: "transacoes" })
export class Transacao {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 100 })
    nome: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @Column({ type: "enum", enum: ["RECEITA", "DESPESA"] })
    tipo: string

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuario_id" })
    user: Usuario

    @Column({ type: "uuid" })
    usuario_id: string

    @CreateDateColumn()
    data_criacao: Date

    @UpdateDateColumn({ nullable: true })
    data_atualizacao: Date

    @DeleteDateColumn({ nullable: true })
    data_exclusao: Date
}