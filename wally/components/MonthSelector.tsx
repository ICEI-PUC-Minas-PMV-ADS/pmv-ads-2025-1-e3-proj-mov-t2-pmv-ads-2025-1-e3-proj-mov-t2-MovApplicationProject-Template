import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type MonthSelectorProps = {
  currentMonth: string
  currentYear: number
  onPreviousMonth: () => void
  onNextMonth: () => void
  onSelectMonth: () => void
  onSelectYear: () => void
}

export const MonthSelector = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  onSelectMonth,
  onSelectYear,
}: MonthSelectorProps) => {
  return (
    <View style={styles.monthSelector}>
      <TouchableOpacity
        onPress={onPreviousMonth}
        style={styles.monthArrow}
        accessible={true}
        accessibilityLabel="Mês anterior"
        accessibilityHint="Toque para ir para o mês anterior"
      >
        <MaterialIcons name="chevron-left" size={24} color="#006A71" />
      </TouchableOpacity>

      <View style={styles.dateSelectors}>
        <TouchableOpacity
          onPress={onSelectMonth}
          style={styles.monthTextContainer}
          accessible={true}
          accessibilityLabel={`Mês atual: ${currentMonth}`}
          accessibilityHint="Toque para selecionar um mês"
        >
          <Text style={styles.monthText}>{currentMonth}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#006A71" />
        </TouchableOpacity>

        <Text style={styles.dateSeparator}>/</Text>

        <TouchableOpacity
          onPress={onSelectYear}
          style={styles.yearTextContainer}
          accessible={true}
          accessibilityLabel={`Ano atual: ${currentYear}`}
          accessibilityHint="Toque para selecionar um ano"
        >
          <Text style={styles.yearText}>{currentYear}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#006A71" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={onNextMonth}
        style={styles.monthArrow}
        accessible={true}
        accessibilityLabel="Próximo mês"
        accessibilityHint="Toque para ir para o próximo mês"
      >
        <MaterialIcons name="chevron-right" size={24} color="#006A71" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  monthArrow: {
    padding: 8,
  },
  dateSelectors: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  monthTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 26,
    backgroundColor: "#DCF0F2",
  },
  yearTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 26,
    backgroundColor: "#DCF0F2",
  },
  monthText: {
    fontFamily: "Poppins_300Light",
    fontSize: 14,
    color: "#333",
    marginRight: 4,
  },
  yearText: {
    fontFamily: "Poppins_300Light",
    fontSize: 14,
    color: "#333",
    marginRight: 4,
  },
  dateSeparator: {
    fontSize: 16,
    color: "#ffff",
  },
})