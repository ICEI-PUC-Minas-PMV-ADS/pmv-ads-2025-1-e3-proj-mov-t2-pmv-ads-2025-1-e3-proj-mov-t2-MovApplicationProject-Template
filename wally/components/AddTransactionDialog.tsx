import { View, Pressable, StyleSheet, Text } from "react-native"
import { Dialog, Button, TextInput } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"
import { TransactionType } from "@/app/types"

type AddTransactionDialogProps = {
  visible: boolean
  onDismiss: () => void
  activeTransactionType: TransactionType | null
  transactionValue: string
  onTransactionValueChange: (value: string) => void
  transactionDescription: string
  onTransactionDescriptionChange: (value: string) => void
  formattedDate: string
  onDatePress: () => void
  onAddTransaction: () => void
}

export const AddTransactionDialog = ({
  visible,
  onDismiss,
  activeTransactionType,
  transactionValue,
  onTransactionValueChange,
  transactionDescription,
  onTransactionDescriptionChange,
  formattedDate,
  onDatePress,
  onAddTransaction,
}: AddTransactionDialogProps) => {
  const getColorByType = (type: TransactionType) => {
    return type === "receita" ? "#249B24" : "#EA1919"
  }

  const getTitleByType = (type: TransactionType) => {
    return type === "receita" ? "Adicionar Receita" : "Adicionar Despesa"
  }

  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
      <Dialog.Title>
        <View style={styles.dialogTitleContainer}>
          <View
            style={[
              styles.dialogIconContainer,
              { backgroundColor: activeTransactionType ? getColorByType(activeTransactionType) : "#249B24" },
            ]}
          >
            <MaterialIcons name="add" size={24} color="#FFF" />
          </View>
          <Text style={styles.dialogTitleText}>
            {activeTransactionType ? getTitleByType(activeTransactionType) : "Adicionar"}
          </Text>
        </View>
      </Dialog.Title>

      <View style={styles.dialogRow}>
        <TextInput
          label="Valor"
          value={transactionValue}
          onChangeText={onTransactionValueChange}
          keyboardType="decimal-pad"
          style={styles.dialogInput}
          mode="outlined"
          outlineColor="#DADADA"
          activeOutlineColor="#A6A6A6"
          left={<TextInput.Affix text="R$" />}
          accessible={true}
          accessibilityLabel={`Valor da ${activeTransactionType === "receita" ? "receita" : "despesa"}`}
          accessibilityHint={`Digite o valor da ${activeTransactionType === "receita" ? "receita" : "despesa"}`}
        />

        <Pressable onPress={onDatePress} style={styles.datePickerButton}>
          <TextInput
            label="Data"
            value={formattedDate}
            editable={false}
            style={styles.dialogInput}
            mode="outlined"
            outlineColor="#DADADA"
            activeOutlineColor="#A6A6A6"
            right={<TextInput.Icon icon="calendar" onPress={onDatePress} />}
            accessible={true}
            accessibilityLabel={`Data: ${formattedDate}`}
            accessibilityHint="Toque para selecionar uma data"
          />
        </Pressable>
      </View>

      <View style={styles.dialogRow}>
        <TextInput
          label="Descrição"
          value={transactionDescription}
          onChangeText={onTransactionDescriptionChange}
          style={[styles.dialogInput]}
          mode="outlined"
          outlineColor="#DADADA"
          activeOutlineColor="#A6A6A6"
          accessible={true}
          accessibilityLabel={`Descrição da ${activeTransactionType === "receita" ? "receita" : "despesa"}`}
          accessibilityHint={`Digite uma descrição para a ${activeTransactionType === "receita" ? "receita" : "despesa"}`}
        />
      </View>

      <Dialog.Actions style={styles.dialogActions}>
        <Button
          onPress={onDismiss}
          textColor="#666"
          style={styles.dialogButton}
          accessible={true}
          accessibilityLabel="Cancelar"
        >
          CANCELAR
        </Button>
        <Button
          onPress={onAddTransaction}
          mode="contained"
          buttonColor={activeTransactionType === "receita" ? "#249B24" : "#EA1919"}
          style={styles.dialogButton}
          accessible={true}
          accessibilityLabel={`Adicionar ${activeTransactionType === "receita" ? "receita" : "despesa"}`}
        >
          ADICIONAR
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 16,
    backgroundColor: "#F4F2F2",
    width: "90%",
    padding: 8,
    alignSelf: "center",
  },
  dialogTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  dialogIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  dialogTitleText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
  dialogRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 4,
  },
  dialogInput: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  datePickerButton: {
    flex: 1,
    marginLeft: 8,
  },
  dialogActions: {
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dialogButton: {
    marginLeft: 8,
    marginBottom: 16,
    marginTop: 16,
    borderRadius: 8,
  },
})