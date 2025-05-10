import fastify from "fastify"
import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { routes } from "./routes";

const server = fastify({
    logger: true
});

server.register(routes)

server.listen({ port: 3333 }).then(() => {
    AppDataSource.initialize().then(() => {
        console.log("Database connected")
    }).catch(error => console.log(error))

    console.log("Server HTTP is running on port 3333")
})