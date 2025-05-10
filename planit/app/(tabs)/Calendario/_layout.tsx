import { Stack } from 'expo-router';
import { GestureResponderEvent, TouchableOpacity, Text } from 'react-native';

export default function CalendarioLayout() {
    return (
        <Stack> 
            <Stack.Screen name="Index" options={{ headerShown: false }} />
            <Stack.Screen name="Agenda" />
        </Stack>
    )
};