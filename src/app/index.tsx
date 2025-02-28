import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(pages)/auth/login");
    }, 1500);
  }, []);
  return (
    <View className="flex h-full w-full items-center justify-center bg-white">
      <View className="mt-10 flex w-full flex-row items-center justify-center gap-4">
        <View className="h-[1px] w-[30%] bg-textSecondaryColor"></View>
        <Text className="text-xl font-semibold text-textSecondaryColor">
          Teste Mobile
        </Text>
        <View className="h-[1px] w-[30%] bg-textSecondaryColor"></View>
      </View>
    </View>
  );
}
