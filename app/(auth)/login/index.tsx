import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { Header, Footer } from "@/components";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { setTokens, showTokens } from "@/api/utils/tokens";
import { useMutation } from "react-query";
import { ILoginRequest } from "@/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Auth from "@/api/auth.api";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const authApi = Auth.getInstance();

  const {
    error,
    isError,
    isLoading,
    mutate: loginUser,
  } = useMutation({
    mutationFn: ({ email, password }: ILoginRequest) => authApi.login({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/(tabs)");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    },
    retry: false,
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <KeyboardAwareScrollView className="h-screen " contentContainerStyle={{ flexGrow: 1 }}>
          <Header leftButton theme={"light"} />

          <View className="flex-1   mt-8 flex justify-between  pb-10 px-5">
            <View className="flex-1">
              <View className="mt-7">
                <Text className="text-black font-medium text-2xl">Welcome Back</Text>
                <Text className="text-slate-700 mt-1">Please login to access your account</Text>
              </View>

              <View className="mt-14">
                <View className="py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
                  <Ionicons
                    name="person-outline"
                    size={19}
                    color="black"
                    style={{ opacity: 0.5 }}
                  />
                  <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Your Email"
                    keyboardType="email-address"
                    className="flex-1 h-6 ml-3"
                    placeholderTextColor={"#666666"}
                    autoCapitalize="none"
                  />
                </View>

                <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
                  <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
                  <TextInput
                    secureTextEntry={!passwordVisible}
                    placeholder="Your Password"
                    className="flex-1 h-6 ml-3"
                    placeholderTextColor={"#666666"}
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather
                      name={passwordVisible ? "eye-off" : "eye"}
                      size={19}
                      color="black"
                      style={{ opacity: 0.5 }}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row w-full mt-3 justify-end">
                  <TouchableOpacity onPress={() => router.push("/reset-password/email")}>
                    <Text className="text-gray-700 font-normal text-xs">Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {isError && (
                  <View className="mt-8 bg-red-50 p-4 border border-red-500 rounded-lg flex flex-row items-center space-x-2">
                    <MaterialIcons name="error-outline" size={20} color="rgb(239 68 68)" />
                    <Text className="text-red-500 text-sm leading-[18px]">
                      Whoops!{" "}
                      {axios.isAxiosError(error) && error.response
                        ? (error.response.data.message as any as string)
                        : "An error occured with registration."}{" "}
                      Please check your information and try again.
                    </Text>
                  </View>
                )}

                <View className="mt-28">
                  <TouchableOpacity
                    disabled={isLoading || !email || !password}
                    onPress={() => loginUser({ email, password })}
                    style={styles.cabaret_shadow}
                    className="p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center"
                  >
                    {isLoading ? (
                      <Text className="text-white font-bold text-base">Logging in...</Text>
                    ) : (
                      <Text className="text-white font-bold text-base">Continue</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Footer />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
