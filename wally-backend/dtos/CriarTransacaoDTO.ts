

export interface CriarTransacaoDTO {
    nome: string
    valor: number
    tipo: "RECEITA" | "DESPESA"
    usuario_id: string
}