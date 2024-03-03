import { View, TouchableOpacity, Text } from "react-native";
import Header from "@/components/header";

export default function Login() {
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
      </View>
    </View>
  );
}
