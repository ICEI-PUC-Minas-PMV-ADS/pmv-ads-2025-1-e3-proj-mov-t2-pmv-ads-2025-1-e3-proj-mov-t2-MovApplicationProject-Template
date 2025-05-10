import { FastifyInstance } from "fastify";
import { UsuariosRepositorio } from "../repositorios/UsuariosRepositorio";

const usuariosRepositorio = new UsuariosRepositorio()


export async function usuariosRoutes(app: FastifyInstance) {
    app.get("/users", async (request, reply) => {
        const usuarios = await usuariosRepositorio.findAll()

        return reply.send(usuarios)
    })

    app.get("/users/:email", async (request, reply) => {
        const { email } = request.params

        const usuario = await usuariosRepositorio.findByEmail(email)

        if (!usuario) {
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }

        return reply.send(usuario)
    })

    app.post("/users", async (request, reply) => {
        const { email, nome, senha, avatar_url } = request.body

        const emailUtilizado = await usuariosRepositorio.findByEmail(email)

        if (emailUtilizado) {
            return reply.status(400).send({ message: "Email já cadastrado" })
        }

        const usuario = await usuariosRepositorio.create({
            email,
            nome,
            senha,
            avatar_url
        })

        return reply.status(201).send(usuario)
    })

    app.put("/users/:id", async (request, reply) => {
        const { id } = request.params

        const { nome, email } = request.body

        const usuario = await usuariosRepositorio.findById(id)

        if (!usuario) {
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }

        usuario.nome = nome
        usuario.email = email

        const usuarioAtualizado = await usuariosRepositorio.update(usuario)

        return reply.status(200).send(usuarioAtualizado)
    })


    app.delete("/users/:id", async (request, reply) => {
        const { id } = request.params

        const usuario = await usuariosRepositorio.findById(id)

        if (!usuario) {
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }

        await usuariosRepositorio.delete(usuario)

        return reply.status(200).send({ message: "Usuário deletado com sucesso" })
    })
}