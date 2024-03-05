import { View, Image, ScrollView } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { Button } from "@/components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Link } from "@/components";
import { Link as ExpoLink } from "expo-router";

export default function PreLogin() {
  return (
    <View className="flex-1 flex justify-between pb-5 bg-white">
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

      <View className="pl-5 w-10/12 flex flex-col items-start justify-start">
        <View>
          <Text className="font-sans font-bold text-xl">Ahla w Sahla bi Le2ine!</Text>
          <Text className="font-sans font-regular w-72 mt-3 leading-5">
            Yalla, join us at Le2ine! Find friends who love what you love.
          </Text>
        </View>

        <View className="mt-10 flex flex-row -ml-2">
          <ExpoLink href="/login/" asChild>
            <Button
              rounded
              icon={<MaterialCommunityIcons name="email-outline" size={21} color="#d14d72" />}
            >
              Login with Email
            </Button>
          </ExpoLink>
        </View>
      </View>
      <View className="ml-5 mt-11 flex flex-col w-full">
        <Text className="font-sans font-regular text-base">Don’t have an account?</Text>
        <View className="mt-4 pr-10 flex h-10 flex-row items-baseline justify-between w-full">
          <Link light href="/signup/myself">
            Register Myself
          </Link>
          <Link light href="/signup/mom">
            Register Mom 
          </Link>
        </View>
      </View>
    </View>
  );
}
