import React, { useRef, useState } from "react";
import { ScrollView, Text, View, TextInput, StyleSheet } from "react-native";
import { Header } from "@/components";
import { Input } from "@/components/input";

export default function SignupMyself() {
  // const inputRef = useRef<>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const showError = () => {
    setError("This is your error message!");
  };

  const hideError = () => {
    setError(undefined);
  };

  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton />
      <ScrollView className="mt-7 px-5">
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