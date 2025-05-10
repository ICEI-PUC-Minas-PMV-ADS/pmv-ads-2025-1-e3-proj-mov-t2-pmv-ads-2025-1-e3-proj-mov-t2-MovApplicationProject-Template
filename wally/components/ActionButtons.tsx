import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { TransactionType } from "@/app/types"

type ActionButtonsProps = {
  onAddTransaction: (type: TransactionType) => void
}

export const ActionButtons = ({ onAddTransaction }: ActionButtonsProps) => {
  return (
    <View style={styles.containerBotoes}>
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => onAddTransaction("receita")}
        accessible={true}
        accessibilityLabel="Adicionar Receita"
        accessibilityHint="Toque para adicionar uma nova receita"
        activeOpacity={0.7}
      >
        <View style={styles.botaoIconeContainer}>
          <MaterialIcons name="add" size={24} color="#FFF" />
        </View>
        <Text style={styles.textoAdicionar}>ADICIONAR RECEITA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => onAddTransaction("despesa")}
        accessible={true}
        accessibilityLabel="Adicionar Despesa"
        accessibilityHint="Toque para adicionar uma nova despesa"
        activeOpacity={0.7}
      >
        <View style={[styles.botaoIconeContainer, { backgroundColor: "#EA1919" }]}>
          <MaterialIcons name="add" size={24} color="#FFF" />
        </View>
        <Text style={styles.textoAdicionar}>ADICIONAR DESPESA</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  botaoAdicionar: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  botaoIconeContainer: {
    backgroundColor: "#249B24",
    width: 24,
    height: 24,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  textoAdicionar: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
})