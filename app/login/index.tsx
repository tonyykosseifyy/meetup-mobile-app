import { View, TouchableOpacity, Text } from "react-native";
import Header from "@/components/header";

export default function Login() {
  return (
    <View className="flex-1 bg-white">
      <Header leftButton />
      <View>
        <Text className="text-cabaret-500 text-center font-medium">Share Smiles, Women's Connections</Text>
      </View>
    </View>
  );
}
