import React from "react";
import { View, Text } from "react-native";
import { Header } from "@/components";

export default function SignUpOtp() {
  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton theme={"light"} />
      <View className="px-5">
        <View className="mt-7">
          <Text className="text-black font-bold text-2xl">Welcome Back</Text>
          <Text className="text-slate-800 mt-2">Please login to access your account</Text>
        </View>
      </View>
    </View>
  );
}
