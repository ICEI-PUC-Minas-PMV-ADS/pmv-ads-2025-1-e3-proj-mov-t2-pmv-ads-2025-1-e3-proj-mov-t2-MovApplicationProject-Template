import { View, Text, ScrollView, } from 'react-native';
import React from 'react';
import CompCalendar from "../../../components/calendar/index";
import PinkBtn from "../../../components/button/pinkBtn";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router'; 

const Calendario = () => {
  return (
    <View className='flex flex-1 bg-white'>
      <ScrollView className='h-auto'>
          <View className='mt-6 mb-5'>
            <CompCalendar /> 
          </View>

          <View className='bg-white'>
            <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
              <Text className='text-center text-xl mb-8'>Horários Disponíveis</Text>
                
              <View className='flex flex-row flex-wrap justify-center align-middle gap-5'> 
                  <View>
                    <Ionicons size={20} name="time-outline" className='p-4 justify-center'/>
                  </View>
                  
                  <View className='border border-green-600 p-4 justify-center rounded-full'>
                    <Text className='text-green-600'>09:00</Text>
                  </View>

                  <View className='border border-green-600 p-4 justify-center rounded-full'>
                    <Text className='text-green-600'>09:00</Text>
                  </View>

                  <View className='border border-green-600 p-4 justify-center rounded-full'>
                    <Text className='text-green-600'>09:00</Text>
                  </View>
              </View>
          </View>
          </View>
          
          <View className='bg-white'>
            <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
              <Text className='text-center text-xl mb-8'>Horários Agendados</Text>
                
              <View className='flex flex-row flex-wrap justify-center gap-5'> 
                  <View>
                    <Ionicons size={20} name="time-outline" className='p-4 justify-center'/>
                  </View>

                  <View className='border border-pink-700 p-4 justify-center rounded-full'>
                    <Text className='text-pink-700'>09:00</Text>
                  </View>

                  <View className='border border-pink-700 p-4 justify-center rounded-full'>
                    <Text className='text-pink-700'>09:00</Text>
                  </View>

                  <View className='border border-pink-700 p-4 justify-center rounded-full'>
                    <Text className='text-pink-700'>09:00</Text>
                  </View>
              </View>
          </View>
          </View>
          
          <View className='bg-white'>
            <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
              <Text className='text-center text-xl mb-8'>Horários Bloqueados</Text>
                
              <View className='flex flex-row flex-wrap justify-center gap-5'> 
                  <View>
                    <Ionicons size={20} name="time-outline" className='p-4 justify-center'/>
                  </View>

                  <View className='border border-slate-500 p-4 justify-center rounded-full'>
                    <Text className='text-slate-500'>09:00</Text>
                  </View>

                  <View className='border border-slate-500 p-4 justify-center rounded-full'>
                    <Text className='text-slate-500'>09:00</Text>
                  </View>

                  <View className='border border-slate-500 p-4 justify-center rounded-full'>
                    <Text className='text-slate-500'>09:00</Text>
                  </View>
              </View>
            </View>
          </View>

          <View className='mt-6 mb-8 flex flex-row flex-wrap justify-evenly'>
            <PinkBtn title="Editar Agenda" onPress={() => { router.push('/(tabs)/Calendario/Agenda') }} />
          </View>
        </ScrollView>
    </View>
  )
}

export default Calendario