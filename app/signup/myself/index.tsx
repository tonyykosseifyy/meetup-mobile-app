import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Header } from "@/components";

export default function SignupMyself() {
  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton />
      <ScrollView className="mt-7 pl-5">
        <View>
          <Text className="font-medium text-2xl">Start your Story</Text>
          <Text className="mt-1 opacity-70">Join Le2ine, find friends, and share laughs</Text>
        </View>
      </ScrollView>
    </View>
  );
}
