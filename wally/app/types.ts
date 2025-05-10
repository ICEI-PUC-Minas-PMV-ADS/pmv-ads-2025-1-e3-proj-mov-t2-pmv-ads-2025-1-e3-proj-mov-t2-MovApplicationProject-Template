export type TransactionType = "receita" | "despesa"

export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  description: string
  date: Date
}

export type TransactionGroup = {
  date: Date
  data: Transaction[]
}