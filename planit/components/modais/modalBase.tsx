import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ModalProps } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

type ModalBaseProps = ModalProps & {
  icone?: keyof typeof Ionicons.glyphMap;
  title?: string;
  text?: string;
  onClose?: () => void;
};

const ModalBase: React.FC<ModalBaseProps> = ({
  icone,
  title,
  text,
  visible,
  children,
  onClose,
  transparent,
  ...props
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType="fade"
          visible={visible}
          className="flex flex-1"
          transparent
        >
          <View className="flex flex-1 flex-row justify-center items-center">
            <View className="w-96 p-5 flex gap-6 rounded-2xl shadow-md bg-white">
              <View className="flex flex-wrap flex-row justify-between">
                <View className="bg-pink-50 w-14 h-14 flex flex-row justify-center items-center rounded-full">
                  <View className="bg-pink-100 w-10 h-10 flex flex-row justify-center items-center rounded-full">
                    <Ionicons name={icone as any} size={20} color="#FF006F" />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={onClose}
                  className="w-14 h-14 flex flex-row justify-center items-center rounded-full"
                >
                  <Ionicons name="close-circle-outline" size={25} />
                </TouchableOpacity>
              </View>

              <View>
                <Text className="text-xl font-semibold">{title}</Text>
              </View>

              <View>
                <Text>{text}</Text>
              </View>

              {children}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ModalBase;
