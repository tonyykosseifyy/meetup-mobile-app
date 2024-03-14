import React from "react";
import { View, Text } from "react-native";
import { Header } from "@/components";
import { OtpInput } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpOtp() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
    <View className="flex-1 bg-white flex">
      <Header leftButton theme={"light"} />
      <View className="px-5">
        <View className="mt-7">
          <Text className="text-black font-medium text-2xl">Verification Code</Text>
          <Text className="text-slate-800 mt-1 leading-5">Please enter code we just send to <Text className="color-cabaret-500 font-bold">michelle@gmail.com</Text></Text>
        </View>

        <View className="mt-12">
          <OtpInput />
          
        </View>
        
      </View>
    </View>
    </SafeAreaView>
  );
}
