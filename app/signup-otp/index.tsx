import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "@/components";
import { OtpInput } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";

export default function SignUpOtp() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
    <View className="flex-1 bg-white flex">
      <Header leftButton theme={"light"} />
      <View className="px-5">
        <View className="mt-7">
          <Text className="text-black font-medium text-2xl">Verification Code</Text>
          <Text className="text-slate-800 mt-1 leading-5">
            Please enter code we just send to{" "}
            <Text className="color-cabaret-500 font-bold">michelle@gmail.com</Text>
          </Text>
        </View>

        <View className="mt-20 w-11/12 mx-auto">
          <OtpInput />
          <View className="mt-4">
            <TouchableOpacity
              style={styles.cabaret_shadow}
              className="p-2 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center"
            >
              <Text className="text-white font-bold text-base">Continue</Text>
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

