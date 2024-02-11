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

      <View className="pl-5">
        <Text className="font-sans font-bold text-xl">
          Ahla w Sahla bi Le2ine!
        </Text>
        <Text className='font-sans font-regular w-72 mt-3 leading-5'>
          Yalla, join us at Le2ine! Find friends who love what you love.
        </Text>
      </View>
    </View>
  );
}
