import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons"
import { Transaction } from "@/app/types"

type TransactionItemProps = {
  transaction: Transaction
  formatCurrency: (value: number) => string
  onDelete: (id: string) => void
}

export const TransactionItem = ({ transaction, formatCurrency, onDelete }: TransactionItemProps) => {
  const getColorByType = (type: "receita" | "despesa") => {
    return type === "receita" ? "#249B24" : "#EA1919"
  }

  return (
    <View
      style={styles.transactionItem}
      accessible={true}
      accessibilityLabel={`${transaction.type === "receita" ? "Receita" : "Despesa"} de ${formatCurrency(transaction.amount)}. ${transaction.description}`}
    >
      <View style={styles.transactionIconContainer}>
        <SimpleLineIcons
          name={transaction.type === "receita" ? "arrow-up-circle" : "arrow-down-circle"}
          size={24}
          color={getColorByType(transaction.type)}
        />
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
      </View>

      <Text style={[styles.transactionAmount, { color: getColorByType(transaction.type) }]}>
        {formatCurrency(transaction.amount)}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(transaction.id)}
        accessible={true}
        accessibilityLabel={`Excluir ${transaction.type === "receita" ? "receita" : "despesa"} ${transaction.description}`}
        accessibilityHint="Toque para excluir esta transação"
      >
        <MaterialIcons name="delete" size={22} color="#84B3B6" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  transactionIconContainer: {
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  transactionAmount: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 12,
  },
  deleteButton: {
    padding: 4,
  },
})