import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "@/components";
import { OtpInput } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useAuth } from "@/providers/auth.provider";
import { useMutation } from "react-query";
import { IVerifyEmailRequest } from "@/interfaces";
import { router } from "expo-router";
import { setTokens } from "@/api/utils/tokens";
import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Auth from "@/api/services/auth/auth.api";

export default function SignUpOtp() {
  const { registeredUser } = useAuth();
  const authApi = Auth.getInstance();
  const [email, password] = [registeredUser?.email, registeredUser?.password];
  const [code, onChangeCode] = useState<string>("");

  useEffect(() => {
    if (!email || !password) {
      router.replace("/");
    }
  }, [email, password]);

  console.log({ email, password, code });
  console.log(code);

  const {
    mutate: mutateVerifyEmail,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ email, password, code }: IVerifyEmailRequest) =>
      authApi.verifyEmail({ email, password, code }),
    onSuccess(data) {
      while (router.canGoBack()) {
        router.back();
      }
      console.log(data);
      const { access, refresh } = data;
      

      router.replace("/signup-interests/");
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
        <Header theme={"light"} />
        <View className="px-5">
          <View className="mt-7">
            <Text className="text-black font-medium text-2xl">Verification Code</Text>
            <Text className="text-slate-700 mt-1 leading-5">
              Please enter code we just sent to{" "}
              <Text className="color-cabaret-500 font-bold">{email}</Text>
            </Text>
          </View>

          <View className="mt-20 w-11/12 mx-auto">
            <OtpInput value={code} onChange={onChangeCode} />

            {/* Error Message */}
            <View
              className={`mt-12 bg-red-50 p-4 border border-red-500 rounded-lg flex flex-row items-center space-x-2 ${isError ? "opacity-1" : "opacity-0"}`}
            >
              <MaterialIcons name="error-outline" size={20} color="rgb(239 68 68)" />
              <Text className="text-red-500 text-sm leading-[18px]">
                Whoops!{" "}
                {axios.isAxiosError(error) && error.response
                  ? (error.response.data.message as any as string)
                  : "An error occured with registration."}{" "}
                Please check your information and try again.
              </Text>
            </View>
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
            {/* <View className="flex flex-row items-baseline justify-center mt-4">
              <Text className="text-slate-700">Didn't receive the code?</Text>
              <TouchableOpacity className="border-b-[0.5px] border-cabaret-500 ml-1">
                <Text className="text-cabaret-500 font-bold">Resend Code</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
