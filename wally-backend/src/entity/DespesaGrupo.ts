import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { GrupoMembro } from "./GrupoMembro"


@Entity({ name: "despesas_grupo" })
export class DespesaGrupo {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 100 })
    nome: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @Column({ type: "varchar", length: 255 })
    tipo: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_pago: number

    @Column({ type: "timestamp" })
    data_pago: Date

    @Column({ type: "boolean", default: false })
    usuario_criador: boolean

    @ManyToOne(() => GrupoMembro)
    @JoinColumn({ name: "grupo_membros_id" })
    grupo_membro: GrupoMembro

    @Column({ type: "uuid" })
    grupo_membros_id: string

    data_criacao: Date
    data_atualizacao: Date
    data_exclusao: Date
}