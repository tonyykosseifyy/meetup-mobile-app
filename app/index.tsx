import { View, Image } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { Button } from "@/components/button";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from "@/components/text";


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

      <View className="pl-5 w-10/12 flex flex-col items-start justify-start">
        <View>
          <Text className="font-sans font-bold text-xl">
            Ahla w Sahla bi Le2ine!
          </Text>
          <Text className="font-sans font-regular w-72 mt-3 leading-5">
            Yalla, join us at Le2ine! Find friends who love what you love.
          </Text>
        </View>

        <View className="mt-8 flex flex-row -ml-2">
          <Button
            rounded
            icon={
              <MaterialCommunityIcons
                name="email-outline"
                size={21}
                color="#d14d72"
              />
            }
          >
            Login with Email
          </Button>
        </View>

        <View className="mt-12 flex flex-col">
            <Text className="font-sans font-regular text-xs">
              Don’t have an account? 
            </Text>
        </View>
      </View>
    </View>
  );
}
