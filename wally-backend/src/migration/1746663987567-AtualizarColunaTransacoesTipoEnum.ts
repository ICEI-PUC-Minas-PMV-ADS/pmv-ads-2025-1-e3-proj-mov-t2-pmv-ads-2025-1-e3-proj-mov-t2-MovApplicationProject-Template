import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizarColunaTransacoesTipoEnum1746663987567 implements MigrationInterface {
    name = 'AtualizarColunaTransacoesTipoEnum1746663987567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transacoes" DROP COLUMN "tipo"`);
        await queryRunner.query(`CREATE TYPE "public"."transacoes_tipo_enum" AS ENUM('RECEITA', 'DESPESA')`);
        await queryRunner.query(`ALTER TABLE "transacoes" ADD "tipo" "public"."transacoes_tipo_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transacoes" DROP COLUMN "tipo"`);
        await queryRunner.query(`DROP TYPE "public"."transacoes_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "transacoes" ADD "tipo" character varying(100) NOT NULL`);
    }

}
