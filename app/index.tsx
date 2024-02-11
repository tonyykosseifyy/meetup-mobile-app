import { Link } from "expo-router";
import { Text, View, Image } from "react-native";
import { LogoNavbar } from "@/components/logo";

export default function PreLogin() {
  return (
    <View className="bg-white flex-1">
      <LogoNavbar />
      <View className="w-full h-96 mt-10">
        <Image
          source={require("@/assets/images/pre_login.png")}
          alt="Pre Login"
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      <View className="flex flex-col pl-5">
        <View>
          <Text className="">

          </Text>
        </View>
      </View>
    </View>
  );
}
