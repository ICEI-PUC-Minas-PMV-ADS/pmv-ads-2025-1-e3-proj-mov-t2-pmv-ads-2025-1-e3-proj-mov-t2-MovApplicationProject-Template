import { CriarUsuarioDTO } from "../../dtos/CriarUsuarioDTO";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

export class UsuariosRepositorio {
    private repositorio = AppDataSource.getRepository(Usuario)

    async create({ avatar_url, email, nome, senha }: CriarUsuarioDTO): Promise<Usuario> {
        const usuario = this.repositorio.create({ avatar_url, email, nome, senha })


        return this.repositorio.save(usuario)
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const usuario = await this.repositorio.findOneBy({ email })

        return usuario
    }

    async findById(id: string): Promise<Usuario | null> {
        const usuario = await this.repositorio.findOneBy({ id })

        return usuario
    }

    async findAll(): Promise<Usuario[]> {
        const usuarios = await this.repositorio.find()

        return usuarios
    }

    async update(usuario: Usuario): Promise<Usuario> {
        return this.repositorio.save(usuario)
    }

    async delete(usuario: Usuario): Promise<void> {
        await this.repositorio.delete(usuario.id)
    }
}