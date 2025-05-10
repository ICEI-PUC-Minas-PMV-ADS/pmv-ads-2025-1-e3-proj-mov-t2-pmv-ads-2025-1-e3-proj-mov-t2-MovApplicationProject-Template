
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DespesaGrupo } from "./DespesaGrupo"

@Entity({ name: "pagamentos_despesas" })
export class PagamentoDespesa {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @ManyToOne(() => DespesaGrupo)
    @JoinColumn({ name: "despesa_id" })
    despesa: DespesaGrupo

    @Column({ type: "uuid" })
    despesa_id: string

    @CreateDateColumn()
    data_criacao: Date

    @UpdateDateColumn()
    data_atualizacao: Date

    @DeleteDateColumn()
    data_exclusao: Date


}