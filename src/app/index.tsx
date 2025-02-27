import React from 'react'
import { Image, Text, TouchableOpacity, View, } from 'react-native'
import { router } from 'expo-router'

export default function App() {
  return (
    <View className='flex bg-white justify-center items-center w-full h-full'>
     
      <View className='flex flex-row items-center justify-center gap-4 mt-10 w-full'>
        <View className='w-[30%] h-[1px] bg-textSecondaryColor'></View>
        <Text className='text-xl text-textSecondaryColor font-semibold'>OU</Text>
        <View className='w-[30%] h-[1px] bg-textSecondaryColor'></View>
      </View>
    </View>

  )
}