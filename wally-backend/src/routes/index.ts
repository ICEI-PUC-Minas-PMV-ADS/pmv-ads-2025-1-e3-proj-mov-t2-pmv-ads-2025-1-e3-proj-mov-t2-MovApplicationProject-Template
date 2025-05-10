import { FastifyInstance } from "fastify";
import { usuariosRoutes } from "./usuarios.routes";
import { transacoesRoutes } from "./transacoes.routes";

export async function routes(app: FastifyInstance) {
    app.register(usuariosRoutes)
    app.register(transacoesRoutes)
}