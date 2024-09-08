import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "@/components";
import { OtpInput } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useAuth } from "@/providers/auth.provider";
import { router } from "expo-router";
import Auth from "@/api/auth.api";
import { useMutation } from "react-query";
import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ResetPasswordOTP() {
  const [code, onChangeCode] = useState<string>("");

  const { resetPasswordInfo, setResetPasswordInfo } = useAuth();
  const email = resetPasswordInfo ? resetPasswordInfo.email : "";
  const authApi = Auth.getInstance();

  const {
    error,
    isError,
    isLoading,
    mutate: checkResetOtpCode,
  } = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      authApi.checkResetOtpCode({ email, code }),
    onSuccess: () => {
      setResetPasswordInfo({
        email,
        code,
      });
      router.replace("/(auth)/reset-password/change-password");
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
        <Header theme={"light"} />
        <View className="px-5">
          <View className="mt-7">
            <Text className="text-black font-medium text-2xl">Verification Code</Text>
            <Text className="text-slate-700 mt-1 leading-5">
              Please enter code we just send to{" "}
              <Text className="color-cabaret-500 font-bold">{email}</Text>
            </Text>
          </View>

          <View className="mt-20 w-11/12 mx-auto">
            <OtpInput value={code} onChange={onChangeCode} />

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

            <View className="mt-32">
              <TouchableOpacity
                onPress={() => checkResetOtpCode({ email, code })}
                disabled={!code || code.length != 4}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center"
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
    </SafeAreaView>
  );
}
