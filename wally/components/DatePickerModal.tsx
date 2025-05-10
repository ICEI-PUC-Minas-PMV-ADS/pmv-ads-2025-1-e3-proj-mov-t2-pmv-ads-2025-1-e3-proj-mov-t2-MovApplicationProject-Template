import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, FlatList } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type DatePickerModalProps = {
  visible: boolean
  onClose: () => void
  activeTab: "month" | "year"
  onTabChange: (tab: "month" | "year") => void
  currentMonthIndex: number
  currentYear: number
  onMonthSelect: (index: number, month: string) => void
  onYearSelect: (year: number) => void
  meses: string[]
  anos: number[]
}

export const DatePickerModal = ({
  visible,
  onClose,
  activeTab,
  onTabChange,
  currentMonthIndex,
  currentYear,
  onMonthSelect,
  onYearSelect,
  meses,
  anos,
}: DatePickerModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.datePickerModalContainer}>
          <View style={styles.datePickerHeader}>
            <Text style={styles.datePickerTitle}>
              {activeTab === "month" ? "Selecione o mês" : "Selecione o ano"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.datePickerTabs}>
            <TouchableOpacity
              style={[styles.datePickerTab, activeTab === "month" && styles.datePickerTabActive]}
              onPress={() => onTabChange("month")}
            >
              <Text style={[styles.datePickerTabText, activeTab === "month" && styles.datePickerTabTextActive]}>
                Mês
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.datePickerTab, activeTab === "year" && styles.datePickerTabActive]}
              onPress={() => onTabChange("year")}
            >
              <Text style={[styles.datePickerTabText, activeTab === "year" && styles.datePickerTabTextActive]}>
                Ano
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "month" ? (
            <ScrollView style={styles.datePickerScrollView}>
              {meses.map((mes, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.datePickerItem, currentMonthIndex === index && styles.datePickerItemSelected]}
                  onPress={() => onMonthSelect(index, mes)}
                >
                  <Text
                    style={[
                      styles.datePickerItemText,
                      currentMonthIndex === index && styles.datePickerItemTextSelected,
                    ]}
                  >
                    {mes}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <FlatList
              data={anos}
              keyExtractor={(item) => item.toString()}
              style={styles.datePickerScrollView}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.datePickerItem, currentYear === item && styles.datePickerItemSelected]}
                  onPress={() => onYearSelect(item)}
                >
                  <Text
                    style={[styles.datePickerItemText, currentYear === item && styles.datePickerItemTextSelected]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          <TouchableOpacity style={styles.datePickerCloseButton} onPress={onClose}>
            <Text style={styles.datePickerCloseButtonText}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerModalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "80%",
    maxHeight: "70%",
    padding: 16,
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
  datePickerTabs: {
    flexDirection: "row",
    marginBottom: 8,
  },
  datePickerTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  datePickerTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#006A71",
  },
  datePickerTabText: {
    fontSize: 16,
    color: "#666",
  },
  datePickerTabTextActive: {
    color: "#006A71",
    fontWeight: "bold",
  },
  datePickerScrollView: {
    maxHeight: 300,
  },
  datePickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 26,
  },
  datePickerItemSelected: {
    backgroundColor: "#C6DFE2",
  },
  datePickerItemText: {
    fontFamily: "Poppins_300Light",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  datePickerItemTextSelected: {
    fontFamily: "Poppins_700Bold",
    fontWeight: "bold",
    color: "#006A71",
  },
  datePickerCloseButton: {
    marginTop: 26,
    backgroundColor: "#48A6A7",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 46,
    marginBottom: 16,
    alignItems: "center",
  },
  datePickerCloseButtonText: {
    fontFamily: "Poppins_300Ligth",
    color: "#fff",
  },
})