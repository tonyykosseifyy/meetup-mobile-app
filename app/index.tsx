import { View, Image } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Footer, Button } from "@/components";
import { Link as ExpoLink, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { getMe } from "@/api/axios/users";
import { useAuth } from "@/api/mutations/auth/AuthProvider";

export default function PreLogin() {
  const { updateUserInfo } = useAuth();
  const { error, data, isLoading } = useQuery("getMe", getMe, {
    retry: false,
    onSuccess: (response) => {
      updateUserInfo(response?.data);

      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/(tabs)");
    },
  });
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
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
            <Text className="font-bold text-2xl">Ahla w Sahla bi Le2ine!</Text>
            <Text className="w-72 mt-1 text-slate-800 leading-5">
              Yalla, join us at Le2ine! Find friends who love what you love.
            </Text>
          </View>

          <View className="mt-10 flex flex-row -ml-2 ">
            <ExpoLink href="/login/" asChild>
              <Button
                rounded
                addClassName="w-full"
                icon={<MaterialCommunityIcons name="email-outline" size={21} color="#d14d72" />}
              >
                Login with Email
              </Button>
            </ExpoLink>
          </View>
        </View>

        <Footer />
      </View>
    </SafeAreaView>
  );
}
