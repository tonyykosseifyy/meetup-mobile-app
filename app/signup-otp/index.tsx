import React from "react";
import { View, Text } from "react-native";
import { Header } from "@/components";

export default function SignUpOtp() {
  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton theme={"light"} />
      <View className="px-5">
        <View className="mt-7">
          <Text className="text-black font-medium text-2xl">Verification Code</Text>
          <Text className="text-slate-800 mt-1 leading-5">Please enter code we just send to <Text className="color-cabaret-500 font-bold">michelle@gmail.com</Text></Text>
        </View>

        <View className="">

        </View>
      </View>
    </View>
  );
}
