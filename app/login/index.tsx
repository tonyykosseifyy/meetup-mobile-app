import { View } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Login() {
  return (
    <View className="flex-1 bg-white">
      <View className="fixed top-0 right-0 left-0 pt-4 pb-4">
        <LogoNavbar />
      </View>


      <FontAwesome5 name="arrow-left" size={24} color="black" />

      
      
    </View>
  );
}
