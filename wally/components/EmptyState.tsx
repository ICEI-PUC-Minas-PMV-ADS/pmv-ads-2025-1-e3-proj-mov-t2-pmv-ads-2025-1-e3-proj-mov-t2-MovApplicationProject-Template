import { View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type EmptyStateProps = {
  searchQuery: string
  currentMonth: string
  currentYear: number
}

export const EmptyState = ({ searchQuery, currentMonth, currentYear }: EmptyStateProps) => {
  return (
    <View style={styles.semTransacao}>
      <MaterialIcons name="account-balance-wallet" size={48} color="#9ACBD0" style={{ marginBottom: 20 }} />
      <Text style={styles.semTransacaoTexto}>Nenhuma transação encontrada</Text>
      <Text style={styles.semTransacaoSubTexto}>
        {searchQuery.trim() !== ""
          ? "Tente ajustar os filtros de busca"
          : `Adicione transações para ${currentMonth} de ${currentYear}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  semTransacao: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  semTransacaoTexto: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  semTransacaoSubTexto: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
})