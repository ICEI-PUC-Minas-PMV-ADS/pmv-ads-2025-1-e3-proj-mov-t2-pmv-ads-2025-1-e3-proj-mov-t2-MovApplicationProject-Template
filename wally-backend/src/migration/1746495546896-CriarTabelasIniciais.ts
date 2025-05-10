import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelasIniciais1746495546896 implements MigrationInterface {
    name = 'CriarTabelasIniciais1746495546896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(120) NOT NULL, "nome" character varying(100) NOT NULL, "senha" character varying(255) NOT NULL, "avatar_url" character varying(255), "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP DEFAULT now(), "data_exclusao" TIMESTAMP, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grupos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "descricao" character varying(255) NOT NULL, "avatar_url" character varying(255), "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP DEFAULT now(), "data_exclusao" TIMESTAMP, CONSTRAINT "PK_34de64ec8a5ecd99afb23b2bd62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grupos_membros" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grupo_id" uuid NOT NULL, "usuario_id" uuid NOT NULL, "tipo" character varying(100) NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "data_exclusao" TIMESTAMP, CONSTRAINT "PK_0545aa698062fdb5c97e56d4936" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "despesas_grupo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "valor" numeric(10,2) NOT NULL, "tipo" character varying(255) NOT NULL, "total_pago" numeric(10,2) NOT NULL, "data_pago" TIMESTAMP NOT NULL, "usuario_criador" boolean NOT NULL DEFAULT false, "grupo_membros_id" uuid NOT NULL, CONSTRAINT "PK_455c0ccb97726ce5562b53515f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transacoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "valor" numeric(10,2) NOT NULL, "tipo" character varying(100) NOT NULL, "usuario_id" uuid NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP DEFAULT now(), "data_exclusao" TIMESTAMP, CONSTRAINT "PK_19e05c3d8e87df1545fcc6c8505" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pagamentos_despesas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor" numeric(10,2) NOT NULL, "despesa_id" uuid NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "data_exclusao" TIMESTAMP, CONSTRAINT "PK_35b8fb4e30cf78a12fabc8bd02f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "grupos_membros" ADD CONSTRAINT "FK_c1b70e0eb18d9c162b8726238c0" FOREIGN KEY ("grupo_id") REFERENCES "grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grupos_membros" ADD CONSTRAINT "FK_1360f1186680b32d861856b2a52" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "despesas_grupo" ADD CONSTRAINT "FK_5664ea39df336794d1147a503a1" FOREIGN KEY ("grupo_membros_id") REFERENCES "grupos_membros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transacoes" ADD CONSTRAINT "FK_8cb6a1f4e77824057f799940ec7" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pagamentos_despesas" ADD CONSTRAINT "FK_14f17ef621124a3bb93fe5b8c64" FOREIGN KEY ("despesa_id") REFERENCES "despesas_grupo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagamentos_despesas" DROP CONSTRAINT "FK_14f17ef621124a3bb93fe5b8c64"`);
        await queryRunner.query(`ALTER TABLE "transacoes" DROP CONSTRAINT "FK_8cb6a1f4e77824057f799940ec7"`);
        await queryRunner.query(`ALTER TABLE "despesas_grupo" DROP CONSTRAINT "FK_5664ea39df336794d1147a503a1"`);
        await queryRunner.query(`ALTER TABLE "grupos_membros" DROP CONSTRAINT "FK_1360f1186680b32d861856b2a52"`);
        await queryRunner.query(`ALTER TABLE "grupos_membros" DROP CONSTRAINT "FK_c1b70e0eb18d9c162b8726238c0"`);
        await queryRunner.query(`DROP TABLE "pagamentos_despesas"`);
        await queryRunner.query(`DROP TABLE "transacoes"`);
        await queryRunner.query(`DROP TABLE "despesas_grupo"`);
        await queryRunner.query(`DROP TABLE "grupos_membros"`);
        await queryRunner.query(`DROP TABLE "grupos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
