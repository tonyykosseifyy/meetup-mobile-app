import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, StyleSheet } from "react-native";
import { Header, Input } from "@/components";

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
          <Text>Name</Text>
          <Input 
            placeholder="Your Name"
          />
          <Input 
            className="mt-4"
            placeholder="Bio"
            multiline
          />
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
    width: '80%',
    margin: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
    padding: 10,
  }
});