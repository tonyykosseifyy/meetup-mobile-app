import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "@/components";
import { OtpInput } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useAuth } from "@/providers/auth.provider";
import { router } from "expo-router";

export default function ResetPasswordOTP() {
  const { resetPasswordInfo, setResetPasswordInfo } = useAuth();
  const email = resetPasswordInfo ? resetPasswordInfo.email : "";
  const [code, onChangeCode] = useState<string>("");

  const changePasswordFunc = () => {
    setResetPasswordInfo({
      email,
      code,
    });
    router.push("/(auth)/reset-password/change-password");
  };

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
            <View className="mt-32">
              <TouchableOpacity
                onPress={() => changePasswordFunc()}
                disabled={!code || code.length != 4}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center"
              >
                <Text className="text-white font-bold text-base">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
