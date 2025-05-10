import { View, Text, StyleSheet } from "react-native"
import { SimpleLineIcons } from "@expo/vector-icons"
import { MonthSelector } from "./MonthSelector"

type BalanceCardProps = {
  currentMonth: string
  currentYear: number
  saldo: number
  receitas: number
  despesas: number
  onPreviousMonth: () => void
  onNextMonth: () => void
  onSelectMonth: () => void
  onSelectYear: () => void
  formatCurrency: (value: number) => string
}

export const BalanceCard = ({
  currentMonth,
  currentYear,
  saldo,
  receitas,
  despesas,
  onPreviousMonth,
  onNextMonth,
  onSelectMonth,
  onSelectYear,
  formatCurrency,
}: BalanceCardProps) => {
  return (
    <View style={styles.cartaoSaldo}>
      <MonthSelector
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPreviousMonth={onPreviousMonth}
        onNextMonth={onNextMonth}
        onSelectMonth={onSelectMonth}
        onSelectYear={onSelectYear}
      />

      <View style={styles.containerSaldo}>
        <Text style={styles.tituloSaldo}>Saldo</Text>
        <Text style={styles.valorSaldo}>{formatCurrency(saldo)}</Text>
      </View>

      <View style={styles.containerResumo}>
        <View style={styles.itemResumo}>
          <View style={styles.linhaTitulo}>
            <SimpleLineIcons name="arrow-up-circle" size={24} color="#249B24" style={styles.icone} />
            <Text style={styles.tituloResumo}>Receitas</Text>
          </View>
          <Text style={styles.valorReceita}>{formatCurrency(receitas)}</Text>
        </View>

        <View style={styles.itemResumo}>
          <View style={styles.linhaTitulo}>
            <SimpleLineIcons name="arrow-down-circle" size={24} color="#EA1919" style={styles.icone} />
            <Text style={styles.tituloResumo}>Despesas</Text>
          </View>
          <Text style={styles.valorDespesa}>{formatCurrency(despesas)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartaoSaldo: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#48A6A7",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 10,
  },
  containerSaldo: {
    alignItems: "center",
    marginBottom: 24,
  },
  tituloSaldo: {
    fontFamily: "Poppins_300Light",
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
    marginTop: 8,
  },
  valorSaldo: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  containerResumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  itemResumo: {
    alignItems: "center",
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icone: {
    marginRight: 8,
  },
  tituloResumo: {
    fontFamily: "Poppins_300Light",
    fontSize: 16,
    color: "#000",
  },
  valorReceita: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#249B24",
  },
  valorDespesa: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EA1919",
  },
})