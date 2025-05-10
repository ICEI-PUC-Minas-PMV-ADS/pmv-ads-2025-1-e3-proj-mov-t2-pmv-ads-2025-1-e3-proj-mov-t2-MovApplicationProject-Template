import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Keyboard,
  Alert,
  Platform,
} from "react-native"
import { useState, useEffect, useMemo } from "react"
import { PaperProvider } from "react-native-paper"
import {
  format,
  getMonth,
  getYear,
  addMonths,
  subMonths,
  isFuture,
  isSameMonth,
  isSameYear,
} from "date-fns"
import { ptBR } from "date-fns/locale"

import { Header } from "@/components/Header"
import { BalanceCard } from "@/components/BalanceCard"
import { ActionButtons } from "@/components/ActionButtons"
import { TransactionList } from "@/components/TransactionList"
import { DatePickerModal } from "@/components/DatePickerModal"
import { TransactionDatePicker } from "@/components/TransactionDatePicker"
import { AddTransactionDialog } from "@/components/AddTransactionDialog"

import { Transaction, TransactionType } from "@/app/types"

const meses = Array.from(
  { length: 12 },
  (_, i) => format(new Date(2024, i, 1), "MMMM", { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase()),
)

const anoAtual = new Date().getFullYear()
const anos = Array.from({ length: anoAtual - 2009 }, (_, i) => 2010 + i)

export default function Wallet() {
  const dataAtual = new Date()
  const mesAtual = getMonth(dataAtual)
  const anoAtualState = getYear(dataAtual)

  const [currentMonth, setCurrentMonth] = useState(meses[mesAtual])
  const [currentMonthIndex, setCurrentMonthIndex] = useState(mesAtual)
  const [currentYear, setCurrentYear] = useState(anoAtualState)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [activeDateTab, setActiveDateTab] = useState<"month" | "year">("month")
  const [searchQuery, setSearchQuery] = useState("")

  const [saldo, setSaldo] = useState(0)
  const [receitas, setReceitas] = useState(0)
  const [despesas, setDespesas] = useState(0)

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [dialogVisible, setDialogVisible] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [activeTransactionType, setActiveTransactionType] = useState<TransactionType | null>(null)
  const [transactionDate, setTransactionDate] = useState(new Date())
  const [transactionValue, setTransactionValue] = useState("")
  const [transactionDescription, setTransactionDescription] = useState("")

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  })

  const formatCurrency = (value: number) => {
    return currencyFormatter.format(value)
  }

  const formatDateForDisplay = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: ptBR })
  }

  const filteredTransactionsByMonth = useMemo(() => {
    return transactions.filter((transaction) => {
      return (
        isSameMonth(transaction.date, new Date(currentYear, currentMonthIndex)) &&
        isSameYear(transaction.date, new Date(currentYear, currentMonthIndex))
      )
    })
  }, [transactions, currentMonthIndex, currentYear])

  const filteredTransactions = useMemo(() => {
    if (searchQuery.trim() === "") {
      return filteredTransactionsByMonth
    } else {
      return transactions.filter((transaction) => {
        const searchLower = searchQuery.toLowerCase()
        const descriptionMatch = transaction.description.toLowerCase().includes(searchLower)
        const valueMatch = transaction.amount.toString().includes(searchLower)
        const typeMatch = transaction.type.toLowerCase().includes(searchLower)
        return descriptionMatch || valueMatch || typeMatch
      })
    }
  }, [transactions, filteredTransactionsByMonth, searchQuery])

  useEffect(() => {
    let totalReceitas = 0
    let totalDespesas = 0

    filteredTransactionsByMonth.forEach((transaction) => {
      if (transaction.type === "receita") {
        totalReceitas += transaction.amount
      } else {
        totalDespesas += transaction.amount
      }
    })

    setReceitas(totalReceitas)
    setDespesas(totalDespesas)
    setSaldo(totalReceitas - totalDespesas)
  }, [filteredTransactionsByMonth])

  const mudarMes = (direcao: "anterior" | "proximo") => {
    const dataAtual = new Date(currentYear, currentMonthIndex, 1)
    const novaData = direcao === "anterior" ? subMonths(dataAtual, 1) : addMonths(dataAtual, 1)

    const novoMesIndex = getMonth(novaData)
    const novoAno = getYear(novaData)

    setCurrentMonthIndex(novoMesIndex)
    setCurrentMonth(meses[novoMesIndex])
    setCurrentYear(novoAno)
  }

  const showDatePickerModal = (tab: "month" | "year") => {
    setActiveDateTab(tab)
    setShowDatePicker(true)
  }

  const handleMonthSelect = (index: number, month: string) => {
    setCurrentMonthIndex(index)
    setCurrentMonth(month)
    setShowDatePicker(false)
  }

  const handleYearSelect = (year: number) => {
    setCurrentYear(year)
    setShowDatePicker(false)
  }

  const showTransactionDialog = (type: TransactionType) => {
    setTransactionDate(new Date())
    setTransactionValue("")
    setTransactionDescription("")
    setActiveTransactionType(type)
    setDialogVisible(true)
  }

  const hideTransactionDialog = () => {
    setDialogVisible(false)
    setShowPicker(false)
    setActiveTransactionType(null)
    setTransactionValue("")
    setTransactionDescription("")
  }

  const toggleDataPicker = () => {
    Keyboard.dismiss()
    setShowPicker(!showPicker)
  }

  const handleDateChange = ({ type }: any, selectedDate?: Date) => {
    if (type === "set" && selectedDate) {
      if (isFuture(selectedDate)) {
        Alert.alert("Data inválida", "Não é possível adicionar transações com datas futuras.", [{ text: "OK" }])
        return
      }

      setTransactionDate(selectedDate)

      if (Platform.OS === "android") {
        setShowPicker(false)
      }
    } else {
      setShowPicker(false)
    }
  }

  const isValidTransactionValue = (value: string): boolean => {
    if (!value) return false
    const numValue = Number.parseFloat(value.replace(",", "."))
    return !isNaN(numValue) && numValue > 0
  }

  const adicionarTransacao = () => {
    if (!isValidTransactionValue(transactionValue)) {
      Alert.alert("Erro", "Por favor, insira um valor válido")
      return
    }

    if (isFuture(transactionDate)) {
      Alert.alert("Data inválida", "Não é possível adicionar transações com datas futuras.")
      return
    }

    const valor = Number.parseFloat(transactionValue.replace(",", "."))

    const novaTransacao: Transaction = {
      id: Date.now().toString(),
      type: activeTransactionType!,
      amount: valor,
      description: transactionDescription || (activeTransactionType === "receita" ? "Receita" : "Despesa"),
      date: transactionDate,
    }

    setTransactions((prev) => [novaTransacao, ...prev])
    hideTransactionDialog()
  }

  const removerTransacao = (id: string) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#9ACBD0" barStyle="dark-content" />

        <Header />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <BalanceCard
            currentMonth={currentMonth}
            currentYear={currentYear}
            saldo={saldo}
            receitas={receitas}
            despesas={despesas}
            onPreviousMonth={() => mudarMes("anterior")}
            onNextMonth={() => mudarMes("proximo")}
            onSelectMonth={() => showDatePickerModal("month")}
            onSelectYear={() => showDatePickerModal("year")}
            formatCurrency={formatCurrency}
          />

          <ActionButtons onAddTransaction={showTransactionDialog} />

          <TransactionList
            transactions={filteredTransactions}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            formatCurrency={formatCurrency}
            onDeleteTransaction={removerTransacao}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </ScrollView>

        <DatePickerModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          activeTab={activeDateTab}
          onTabChange={setActiveDateTab}
          currentMonthIndex={currentMonthIndex}
          currentYear={currentYear}
          onMonthSelect={handleMonthSelect}
          onYearSelect={handleYearSelect}
          meses={meses}
          anos={anos}
        />

        <AddTransactionDialog
          visible={dialogVisible}
          onDismiss={hideTransactionDialog}
          activeTransactionType={activeTransactionType}
          transactionValue={transactionValue}
          onTransactionValueChange={setTransactionValue}
          transactionDescription={transactionDescription}
          onTransactionDescriptionChange={setTransactionDescription}
          formattedDate={formatDateForDisplay(transactionDate)}
          onDatePress={toggleDataPicker}
          onAddTransaction={adicionarTransacao}
        />

        <TransactionDatePicker
          visible={showPicker}
          onClose={() => setShowPicker(false)}
          date={transactionDate}
          onChange={handleDateChange}
        />
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F2F2",
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
})