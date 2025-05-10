import { View, Modal, TouchableOpacity, Text, StyleSheet, Platform } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from "react-native-paper"
import DatePicker from "@react-native-community/datetimepicker"

type TransactionDatePickerProps = {
  visible: boolean
  onClose: () => void
  date: Date
  onChange: (event: any, date?: Date) => void
}

export const TransactionDatePicker = ({ visible, onClose, date, onChange }: TransactionDatePickerProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.datePickerOverlay}>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerHeader}>
            <Text style={styles.datePickerTitle}>Selecione a data</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <DatePicker
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={date}
            onChange={onChange}
            minimumDate={new Date(2010, 0, 1)}
            maximumDate={new Date()}
            style={styles.datePicker}
          />
          <View style={styles.datePickerActions}>
            <Button onPress={onClose} mode="contained" buttonColor="#48A6A7" style={{ borderRadius: 8 }}>
              CONFIRMAR
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  datePickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  datePickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "90%",
    maxWidth: 400,
    zIndex: 10000,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    margin: 8,
  },
  datePickerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    fontWeight: "bold",
  },
  datePicker: {
    marginBottom: 16,
  },
  datePickerActions: {
    flexDirection: "row",
    justifyContent: "center",
  },
})