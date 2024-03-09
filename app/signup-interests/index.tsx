import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "@/components";
import styles from "@/constants/styles";
import CustomLink from "@/components/link";

const Skip = (): React.JSX.Element => (
  <TouchableOpacity>
    <Text className="text-cabaret-500 font-bold">Skip</Text>
  </TouchableOpacity>
);

export default function SignUpOtp() {
  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton theme={"light"} rightButton={Skip()} />
      <View className="px-5">
        <View className="mt-7">
          <Text className="text-black font-medium text-2xl">Select up to 3 interest</Text>
          <Text className="text-slate-800 mt-1 leading-5">
            Tell us about your interests and what excite you
          </Text>
        </View>

        <View className="mt-20 bg-black">

        </View>
      </View>
    </View>
  );
}
