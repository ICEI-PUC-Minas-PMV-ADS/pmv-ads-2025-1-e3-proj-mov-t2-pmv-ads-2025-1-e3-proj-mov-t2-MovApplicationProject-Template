import { View, Text, StyleSheet } from "react-native"
import { Searchbar } from "react-native-paper"
import { TransactionItem } from "./TransactionItem"
import { EmptyState } from "./EmptyState"
import { Transaction, TransactionGroup } from "@/app/types"
import { format, isToday } from "date-fns"
import { ptBR } from "date-fns/locale"

type TransactionListProps = {
  transactions: Transaction[]
  searchQuery: string
  onSearchChange: (query: string) => void
  formatCurrency: (value: number) => string
  onDeleteTransaction: (id: string) => void
  currentMonth: string
  currentYear: number
}

export const TransactionList = ({
  transactions,
  searchQuery,
  onSearchChange,
  formatCurrency,
  onDeleteTransaction,
  currentMonth,
  currentYear,
}: TransactionListProps) => {
  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return "Hoje"
    }

    const weekday = format(date, "EEEE", { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase())
    const day = format(date, "dd")

    return `${weekday}, ${day}`
  }

  const groupTransactionsByDate = (transactions: Transaction[]): TransactionGroup[] => {
    const groups: { [key: string]: Transaction[] } = {}

    transactions.forEach((transaction) => {
      const dateKey = format(transaction.date, "yyyy-MM-dd")

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].push(transaction)
    })

    return Object.entries(groups)
      .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
      .map(([date, transactions]) => ({
        date: new Date(date),
        data: transactions,
      }))
  }

  const groupedTransactions = groupTransactionsByDate(transactions)

  return (
    <>
      <Searchbar
        placeholder="Filtrar transações"
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchbarInput}
        iconColor="#84B3B6"
        accessible={true}
        accessibilityLabel="Filtrar transações"
        accessibilityHint="Digite para filtrar suas transações"
      />

      {groupedTransactions.length > 0 ? (
        groupedTransactions.map((group, index) => (
          <View key={index}>
            <Text style={styles.transactionGroupTitulo}>{formatDate(group.date)}</Text>

            {group.data.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                formatCurrency={formatCurrency}
                onDelete={onDeleteTransaction}
              />
            ))}
          </View>
        ))
      ) : (
        <EmptyState
          searchQuery={searchQuery}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 8,
    height: 60,
  },
  searchbarInput: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#000",
  },
  transactionGroupTitulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    color: "#333",
  },
})