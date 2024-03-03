import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import Header from "@/components/header";

export default function Login() {
  const [ email, setEmail ] = useState<string>("");
  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton />
      <View>
        <Text className="text-cabaret-500 text-center font-medium">Share Smiles, Women's Connections</Text>
      </View>

      <View className="flex-1 ml-2 mr-2 mt-8 bg-cabaret-500 rounded-t-[40px]">
          <View>
            <Text className="text-white text-center font-bold text-2xl mt-7">Welcome Back</Text>
            <Text className="text-white text-center mt-3">Please login to access your account</Text>
          </View>

          <View className="mt-14 mx-7">
            <View className="p-2 bg-white h-10 rounded-full flex flex-row items-start justify-between">
              <TextInput
                onChangeText={setEmail}
                value={email}
                placeholder="Your email"
                keyboardType="email-address" 
                className="flex-1 h-6"
              />

            </View>
            
          </View>
      </View>

    </View>
  );
}
