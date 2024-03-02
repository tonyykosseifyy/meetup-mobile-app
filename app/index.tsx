import { View, Image, ScrollView } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { Button } from "@/components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Link } from "@/components";
import { Link as ExpoLink } from "expo-router";


export default function PreLogin() {
  return (
    <View className="flex-1 bg-white">
      <View className="fixed top-0 right-0 left-0 pt-4 pb-4">
        <LogoNavbar />
      </View>

      <ScrollView className="flex-1 relative">
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

          <View className="mt-11 flex flex-row -ml-2">
            <ExpoLink href="/login/" asChild>
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
            </ExpoLink>
          </View>
        </View>
        <View className="ml-5  mt-11 flex flex-col w-full">
          <Text className="font-sans font-regular text-xs">
            Don’t have an account?
          </Text>
          <View className="mt-5 pr-10 flex flex-row items-baseline justify-between w-full">
            <Link href="/">Sign up as myself</Link>
            <Text className="font-sans text-gray-500 text-xs">Or</Text>
            <Link href="/">Sign up Mom</Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
