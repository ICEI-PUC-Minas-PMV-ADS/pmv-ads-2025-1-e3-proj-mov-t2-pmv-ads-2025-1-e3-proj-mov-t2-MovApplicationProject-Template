import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import useAgendamento from "@/hooks/useAgendamento";
import { useUserData } from "@/hooks/useUserData";

const Notificacao = () => {
  const { agendamentos, loading } = useAgendamento();
  const { userData } = useUserData();

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.preto}
          className="mt-10"
        />
      ) : agendamentos.length === 0 ? (
        <Text className="text-center mt-5 text-base text-neutral-500">
          Nenhuma notificação encontrada.
        </Text>
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`flex-row justify-between items-center py-4 border-b border-neutral-100 ${
                item.lida ? "bg-white" : "bg-blue-50"
              }`}
            >
              <View className="flex-1 pr-2">
                <Text className="text-base font-semibold text-black mb-1 mx-4">
                  {item.titulo || "Atividade agendada com sucesso!"}
                </Text>
                <Text
                  className="text-sm text-neutral-500 mx-4"
                  numberOfLines={2}
                >
                  {item.descricao ||
                    `Olá ${
                      userData?.nome || "Usuário"
                    }, seu novo compromisso é no dia ${item.dataInicio} às ${
                      item.horaInicio
                    }`}
                </Text>
              </View>

              <Text className="text-xs text-neutral-400 mr-2">
                {item.horaInicio || "Indefinido"}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Notificacao;
