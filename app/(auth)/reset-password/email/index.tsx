import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { Header, Footer } from "@/components";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { setTokens, showTokens } from "@/api/utils/tokens";
import { useMutation } from "react-query";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/providers/auth.provider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Auth from "@/api/services/auth.api";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const authApi = Auth.getInstance();
  const { setResetPasswordInfo } = useAuth();

  const {
    error,
    isError,
    isLoading,
    mutate: requestResetPassword,
  } = useMutation({
    mutationFn: ({ email }: { email: string }) => authApi.requestResetPassword({ email }),
    onSuccess: () => {
      Alert.alert(
        "Reset Password",
        "We have sent you an email with a code to reset your password.",
        [
          {
            text: "OK",
            onPress: () => {
              setResetPasswordInfo({ email, code: "" });
              router.replace("/(auth)/reset-password/otp");
            },
          },
        ]
      );
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    },
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <KeyboardAwareScrollView className="h-screen " contentContainerStyle={{ flexGrow: 1 }}>
          <Header leftButton theme={"light"} />

          <View className="flex-1 mt-8 flex justify-between  pb-10 px-5">
            <View className="flex-1">
              <View className="mt-7">
                <Text className="text-black font-medium text-2xl">Reset Password</Text>
                <Text className="text-slate-700 mt-1 leading-5">
                  Please enter your registered email address. We will send you a code to verify your
                  identity.
                </Text>
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
                    disabled={!email}
                    onPress={() => requestResetPassword({ email })}
                    style={styles.cabaret_shadow}
                    className={`p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center ${!email && "bg-cabaret-400"}`}
                  >
                    {isLoading ? (
                      <Text className="text-white font-bold text-base"> Working on it...</Text>
                    ) : (
                      <Text className="text-white font-bold text-base">Continue</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
