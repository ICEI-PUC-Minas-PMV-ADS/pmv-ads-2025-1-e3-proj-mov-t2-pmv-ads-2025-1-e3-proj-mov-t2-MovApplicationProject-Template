
import { Entity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Usuario } from './Usuario';
import { Grupo } from './Grupo';

@Entity({ name: "grupos_membros"})
export class GrupoMembro {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Grupo)
    @JoinColumn({ name: "grupo_id" })
    grupo: Grupo

    @Column({ type: "uuid" })
    grupo_id: string

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuario_id" })
    user: Usuario

    @Column({ type: "uuid" })
    usuario_id: string

    @Column({ type: "varchar", length: 100})
    tipo: string

    @CreateDateColumn()
    data_criacao: Date

    @UpdateDateColumn()
    data_atualizacao: Date

    @DeleteDateColumn()
    data_exclusao: Date
}