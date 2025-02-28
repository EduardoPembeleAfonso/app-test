import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { authState, onLogout } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="/(pages)/auth/login" />
  }

  return (
    <View className="flex h-full w-full items-center justify-center bg-black">
      <View className="mt-10 flex w-full flex-row items-center justify-center gap-4">
        <View className="h-[1px] w-[30%] bg-textSecondaryColor"></View>
        <Text className="text-xl font-semibold text-textSecondaryColor">
          Home
        </Text>
        <View className="h-[1px] w-[30%] bg-textSecondaryColor"></View>
      </View>
      <View className="flex flex-row items-center gap-2">
        <Text className="font-roboto text-lg text-textSecondaryColor">
          User e-mail :{" "}
        </Text>
        <Text className="font-poppins text-[#fff]">
          {authState?.author?.email}
        </Text>
      </View>
      <View className="w-[50%] h-[40px] mt-5">
        <TouchableOpacity
          onPress={onLogout}
          className="h-[30px] flex-1 items-center justify-center rounded-xl bg-[#fff]"
        >
          <Text className="font-body text-base text-[#000]">
            Terminar sessão
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
