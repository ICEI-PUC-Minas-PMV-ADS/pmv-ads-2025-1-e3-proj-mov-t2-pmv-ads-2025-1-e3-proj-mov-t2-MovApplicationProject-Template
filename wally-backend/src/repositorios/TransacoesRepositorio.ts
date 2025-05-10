import { CriarTransacaoDTO } from "../../dtos/CriarTransacaoDTO";
import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";

export class TransacoesRepositorio {
    private repositorio = AppDataSource.getRepository(Transacao)

    async findAllByUsuarioId(usuario_id: string, tipo?: string): Promise<Transacao[]> {
        const transacoes = await this.repositorio.find({ where: { usuario_id, tipo } })

        return transacoes
    }

    async create({ nome, valor, tipo, usuario_id }: CriarTransacaoDTO): Promise<Transacao> {
        const transacao = this.repositorio.create({
            nome,
            valor,
            tipo,
            usuario_id
        })

        await this.repositorio.save(transacao)

        return transacao
    }
}