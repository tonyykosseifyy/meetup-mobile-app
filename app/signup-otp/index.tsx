import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "@/components";
import { OtpInput } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useAuth } from "@/api/mutations/auth/AuthProvider";
import { useVerifyEmail } from "@/api/mutations/auth/useVerifyEmail";
import { useRouter } from "expo-router";

export default function SignUpOtp() {
  const auth = useAuth();
  console.log(auth.userInfo);
  const email = auth.userInfo!.email;
  const password = auth.userInfo!.password;
  const { mutate: verifyEmail, isLoading } = useVerifyEmail();
  const [code, onChangeCode] = useState<string>("");
  const router = useRouter();

  const handleSubmit = () => {
    console.log(email, password);
    if (email && password)
      verifyEmail(
        { email, password, code },
        {
          onSuccess: () => {
            while (router.canGoBack()) {
              router.back();
            }
            router.replace("/(tabs)");
          },
        }
      );
  };
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <Header theme={"light"} />
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
            <View className="mt-32">
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center"
              >
                <Text className="text-white font-bold text-base">
                  {isLoading ? "Loading..." : "Continue"}
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
