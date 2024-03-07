import { View, Image, ScrollView } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Link, Footer, Button } from "@/components";
import { Link as ExpoLink } from "expo-router";

export default function PreLogin() {
  return (
    <View className="flex-1 flex justify-between pb-10 bg-white px-5">
      <View className="pt-4 pb-4">
        <LogoNavbar />
      </View>

      <View className="w-full h-96 mt-10">
        <Image
          source={require("@/assets/images/pre_login.png")}
          alt="Pre Login"
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      <View className="w-10/12 flex flex-col items-start justify-start">
        <View>
          <Text className="font-sans font-bold text-xl">Ahla w Sahla bi Le2ine!</Text>
          <Text className="font-sans font-regular w-72 mt-3 leading-5">
            Yalla, join us at Le2ine! Find friends who love what you love.
          </Text>
        </View>

        <View className="mt-10 flex flex-row -ml-2 ">
          <ExpoLink href="/signup-otp/" asChild>
            <Button
              rounded
              icon={<MaterialCommunityIcons name="email-outline" size={21} color="#d14d72" />}
            >
              Login with Email
            </Button>
          </ExpoLink>
        </View>
      </View>

      <Footer />
    </View>
  );
}
