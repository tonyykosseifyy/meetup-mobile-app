import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, StyleSheet } from "react-native";
import { Header, Input } from "@/components";
import { Ionicons, AntDesign, Feather, Fontisto } from "@expo/vector-icons";

export default function SignupMyself() {
  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton theme="light" />
      <ScrollView className="mt-8 px-5">
        <View>
          <Text className="font-medium text-2xl">Start your Story</Text>
          <Text className="mt-1 opacity-70">Join Le2ine, find friends, and share laughs</Text>
        </View>
        <View className="mt-10">
          {/* name */}
          <View className="py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
            <Ionicons name="person-outline" size={19} color="black" style={{ opacity: 0.5 }} />
            <TextInput
              placeholder="Your Name"
              className="flex-1 h-6 ml-3"
              placeholderTextColor={"#666666"}
            />
          </View>
          {/* occupation */}

          <View className="mt-7 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
            <AntDesign name="profile" size={19} color="black" style={{ opacity: 0.5 }} />
            <TextInput
              placeholder="Your Occupation"
              className="flex-1 h-6 ml-3"
              placeholderTextColor={"#666666"}
            />
          </View>

          {/* email */}
          <View className="mt-7 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
            <Fontisto name="email" size={19} color="black" style={{ opacity: 0.5 }} />
            <TextInput
              placeholder="Your Email"
              keyboardType="email-address"
              className="flex-1 h-6 ml-3"
              placeholderTextColor={"#666666"}
            />
          </View>
          {/* <TextInput
            multiline 
            className="" style={{ textAlignVertical: "top", height: 100 }} placeholder="name" 
          /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 100,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
    padding: 10,
  },
});
