import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import useAgendamento from "@/hooks/useAgendamento";

const Notificacao = () => {
  const { agendamentos, loading } = useAgendamento();

  return (
    <View className="flex-1 p-4">
      {/* Loading */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.preto}
          className="mt-10"
        />
      ) : agendamentos.length === 0 ? (
        <Text className="text-center mt-5 text-base">
          Nenhuma notificação encontrada.
        </Text>
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 mb-3 rounded-xl bg-neutral-100">
              <Text className="text-base font-semibold">Novo agendamento</Text>
              <Text className="text-sm text-neutral-500">
                Cliente: {item.clienteId}
              </Text>
              <Text className="text-sm text-neutral-500">
                Data: {item.data}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Notificacao;
