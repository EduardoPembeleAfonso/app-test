import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Entypo from "react-native-vector-icons/Entypo";
import { useAuth } from "@/src/app/context/AuthContext";
import Button from "@/src/app/components/button";
import ButtonSocial from "@/src/app/components/buttonSocial";

type FormData = {
  email: string;
  password: string;
};

const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(3).required(),
});

export default function Login() {
  const { onLogin, authState } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const inputPasswordRef = useRef();

  function onShowPassword() {
    setShowPassword(!showPassword);
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    Keyboard.dismiss();

    const result = await onLogin(data?.email, data?.password);
    if (result) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      reset({
        email: "",
        password: "",
      });
    }
  };

  const handleOnSubmitEditing = (ref: any) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  if (authState?.authenticated) {
    return <Redirect href="/(pages)/home" />
  }

  return (
    <ScrollView
      className="w-full bg-white dark:bg-black"
      style={{ paddingHorizontal: "5%" }}
    >
      <StatusBar barStyle={"light-content"} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-10 mt-24"></View>

        <View className="mt-8 w-full">
          <View className="mb-5">
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text className="text-sm text-zinc-900 dark:text-zinc-200">
                    E-mail
                  </Text>
                  <View
                    className={`mt-2 h-[61px] flex-row items-center justify-between rounded-[10px] bg-zinc-200 px-4 dark:bg-zinc-800 ${
                      errors.email && "border-[2px] border-red-900"
                    } ${isLoading && "opacity-50"}`}
                  >
                    <TextInput
                      focusable
                      placeholder={"email@examplo.com"}
                      keyboardType="email-address"
                      className="h-full flex-1 dark:text-white"
                      placeholderTextColor={"#636262"}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      autoCapitalize={"none"}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() =>
                        handleOnSubmitEditing(inputPasswordRef)
                      }
                    />
                  </View>
                  {errors.email && (
                    <Text className="mt-3 text-sm text-red-950">
                      E-mail é obrigatório.
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="mb-5">
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text className="text-sm text-zinc-900 dark:text-zinc-200">
                    Senha
                  </Text>
                  <View
                    className={`mt-2 h-[60px] flex-row items-center justify-between rounded-[10px] bg-zinc-200 px-4 dark:bg-zinc-800 ${
                      errors.password && "border-[2px] border-red-900"
                    } ${isLoading && "opacity-50"}`}
                  >
                    <TextInput
                      focusable
                      placeholder="Sua senha"
                      secureTextEntry={showPassword}
                      className="h-full flex-1 dark:text-white"
                      placeholderTextColor={"#636262"}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={inputPasswordRef}
                      autoCapitalize={"none"}
                      returnKeyType="send"
                      blurOnSubmit={false}
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                    <Pressable onPress={onShowPassword}>
                      <Entypo
                        name={showPassword ? "eye" : "eye-with-line"}
                        size={18}
                        color={"#878787"}
                      />
                    </Pressable>
                  </View>
                  {errors.password && (
                    <Text className="mt-3 text-sm text-red-950">
                      Senha é obrigatório e deve ter mais de 2 letras.
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
        </View>

        <View className="mt-10">
          <Button
            text="Entrar"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {}}
          className="mx-auto my-8"
        >
          <Text className="text-violets-800 text-center font-medium">
            Esqueci minha senha? Entrar
          </Text>
        </TouchableOpacity>

        <View className="flex w-full flex-col items-center space-y-[10px]">
          <Text className="mb-2 font-semibold text-zinc-500">Ou entre com</Text>
          <View className="flex flex-row items-center space-x-[10px]">
            <ButtonSocial icon={"google"} onPress={() => {}} />
            <ButtonSocial icon={"apple1"} isLoading={false} />
          </View>
        </View>

        <View className="mx-auto mb-10 mt-8 w-[184px] flex-col items-center justify-center">
          <Text className="font-alt mb-2 block text-center text-xs dark:text-slate-600">
            Ainda não tem uma uma conta?
          </Text>
          <Link href={"/(pages)/auth/login"} className="text-violets-800 ml-2">
            Registre-se agora
          </Link>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}
