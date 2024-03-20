import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "@/components";
import { OtpInput } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useAuth } from "@/api/mutations/auth/AuthProvider";
import { useVerifyEmail } from "@/api/mutations/auth/useVerifyEmail";
import { useMutation } from "react-query";
import { verifyEmail } from "@/api/axios/auth";
import { IVerifyEmailRequest } from "@/interfaces";
import { router } from "expo-router";
import { setTokens } from "@/api/tokens";
import axios from "axios";

export default function SignUpOtp() {
  const { userInfo } = useAuth();
  const [email, password] = [userInfo?.email, userInfo?.password];
  const [code, onChangeCode] = useState<string>("");

  useEffect(() => {
    if (!email || !password) {
      router.replace("/");
    }
  }, [email, password]);

  console.log({ email, password, code });
  console.log(code);

  const { mutate: mutateVerifyEmail, isLoading, isError, error } = useMutation({
    mutationFn: ({ email, password, code }: IVerifyEmailRequest) =>
      verifyEmail({ email, password, code }),
    onSuccess(data) {
      while (router.canGoBack()) {
        router.back();
      }
      console.log(data);
      const { access, refresh } = data;
      setTokens(access, refresh);

      router.replace("/(tabs)/");
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    },
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <Header leftButton theme={"light"} />
        <View className="px-5">
          <View className="mt-7">
            <Text className="text-black font-medium text-2xl">Verification Code</Text>
            <Text className="text-slate-800 mt-1 leading-5">
              Please enter code we just send to{" "}
              <Text className="color-cabaret-500 font-bold">{email}</Text>
            </Text>
          </View>

          <View className="mt-20 w-11/12 mx-auto">
            <OtpInput value={code} onChange={onChangeCode} />
            {isError && (
                <View className="mt-4">
                  <Text className="text-red-500 text-center font-bold">
                    {axios.isAxiosError(error) && error.response
                      ? (error.response.data.error as any as string)
                      : "An error occured with validation."}
                  </Text>
                </View>
              )}
            <View className="mt-32">
              <TouchableOpacity
                onPress={() =>
                  mutateVerifyEmail({
                    email: email || "",
                    password: password || "",
                    code,
                  })
                }
                disabled={isLoading}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center"
              >
                <Text className="text-white font-bold text-base">
                  {isLoading ? "Validating..." : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-baseline justify-center mt-4">
              <Text className="text-slate-800">Didn't receive the code?</Text>
              <TouchableOpacity className="border-b-[0.5px] border-cabaret-500 ml-1">
                <Text className="text-cabaret-500 font-bold">Resend Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
