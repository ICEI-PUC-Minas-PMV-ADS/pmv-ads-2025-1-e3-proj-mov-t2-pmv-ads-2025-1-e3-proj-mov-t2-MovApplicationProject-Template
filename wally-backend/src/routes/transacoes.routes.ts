import { FastifyInstance } from "fastify";
import { TransacoesRepositorio } from "../repositorios/TransacoesRepositorio";
import { UsuariosRepositorio } from "../repositorios/UsuariosRepositorio";

const transacoesRepositorio = new TransacoesRepositorio()
const usuariosRepositorio = new UsuariosRepositorio()

export async function transacoesRoutes(app: FastifyInstance) {
    app.get("/transacoes", async (request, reply) => {
        const { usuario_id, tipo } = request.query

        const transacoes = await transacoesRepositorio.findAllByUsuarioId(usuario_id, tipo)

        return reply.status(200).send(transacoes)
    })

    app.post("/transacoes", async (request, reply) => {
        const { nome, valor, tipo, usuario_id } = request.body


        const usuario = await usuariosRepositorio.findById(usuario_id)

        if (!usuario) {
            return reply.status(404).send({ message: "Usuário inválido" })
        }


        const transacao = await transacoesRepositorio.create({
            nome,
            valor,
            tipo,
            usuario_id
        })


        return reply.status(201).send(transacao)
    })
}