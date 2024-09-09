import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { Link as ExpoLink } from "expo-router";
import NotificationsIcon from "@/assets/icons/settings/notifications.svg";
import ArrowIcon from "@/assets/icons/settings/arrow.svg";
import LocationIcon from "@/assets/icons/settings/location.svg";
import AccountDetailsIcon from "@/assets/icons/settings/account-details.svg";
import LogoutIcon from "@/assets/icons/settings/logout.svg";
import PrivacyIcon from "@/assets/icons/settings/privacy.svg";
import AboutUsIcon from "@/assets/icons/settings/aboutus.svg";
import { Alert } from "react-native";
import { router } from "expo-router";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Auth from "@/api/auth.api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { calculateAge } from "@/utils/common";

const logoutPrompt = (queryClient: QueryClient) => {
  const authApi = Auth.getInstance();
  Alert.alert("Logout", "Are you sure you want to logout?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      style: "destructive",
      text: "Yes",
      onPress: () => {
        authApi.logout();
        while (router.canGoBack()) {
          router.back();
        }
        router.replace("/");
        queryClient.removeQueries();
      },
    },
  ]);
};

export default function Settings() {
  const authApi = Auth.getInstance();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const { data: userInfo, isLoading } = useQuery({
    queryKey: "getMe",
    queryFn: () => authApi.getMe(),
    retry: 1,
  });
  const queryClient = useQueryClient();
  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <View className="flex-1 h-full bg-white flex items-center justify-center">
          <ActivityIndicator size="large" color="#d14d72" />
        </View>
      </View>
    );
  }
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Top Profile */}
      <View className="mt-7 mx-4">
        <View className="flex flex-row items-center">
          <ExpoLink href="/(tabs)/settings/change-avatar" asChild>
            <TouchableOpacity className="relative w-24 h-24 rounded-full p-1.5 bg-cabaret-50/50 border-solid border border-cabaret-200">
              <Image
                source={require("@/assets/images/sample_avatar.jpeg")}
                className="w-full h-full rounded-full object-contain"
              />

              <View className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full">
                <AntDesign name="pluscircle" size={20} color="#d14d72" />
              </View>
            </TouchableOpacity>
          </ExpoLink>

          <View className="flex flex-1 ml-4 pb-3">
            <View className="flex flex-col">
              <Text className="text-sm text-slate-950">
                {userInfo?.full_name},
                <Text className="text-cabaret-800 mb-[1px]"> {userInfo?.occupation}</Text>
              </Text>
              <Text className="text-cabaret-500 italic underline text-xs mb-[1px]">
                {userInfo?.email}
              </Text>
              <Text className="text-slate-500 font-light text-xs mt-[2px]">
                {calculateAge(userInfo?.date_of_birth as string)} years old
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-slate-500 text-[12px] leading-4 ml-2 mt-3">
            {userInfo?.biography}
          </Text>
        </View>
      </View>
      <View className="h-px bg-gray-300 my-6 mx-4" />

      <View className="mx-4">
        <Text className="text-lg mb-4">General</Text>

        <TouchableOpacity className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
          <View className="flex flex-row items-center">
            <NotificationsIcon width={19} />
            <Text className="ml-3">Notifications</Text>
          </View>
          <View>
            <ArrowIcon width={19} />
          </View>
        </TouchableOpacity>

        <View className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
          <View className="flex flex-row items-center">
            <LocationIcon width={19} />
            <Text className="ml-3">Location</Text>
          </View>
          <View>
            <Switch
              trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
              thumbColor={isEnabled ? "#D14D72" : "#f4f3f4"}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: "scale(0.9)" }}
            />
          </View>
        </View>

        <View className="h-px bg-gray-300 my-6" />

        <Text className="text-lg mb-4 mt-2">Account Information</Text>

        {/* Account details */}
        <ExpoLink href="/(tabs)/settings/account-details" asChild>
          <TouchableOpacity className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
            <View className="flex flex-row items-center">
              <AccountDetailsIcon width={19} />
              <Text className="ml-3">Account Details</Text>
            </View>
            <View>
              <ArrowIcon width={19} />
            </View>
          </TouchableOpacity>
        </ExpoLink>

        {/* Change Password */}
        <ExpoLink href="/(tabs)/settings/change-password" asChild>
          <TouchableOpacity className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
            <View className="flex flex-row items-center">
              <MaterialCommunityIcons
                name="security"
                style={{ opacity: 0.6 }}
                size={20}
                color="#222222"
              />
              <Text className="ml-3">Change Password</Text>
            </View>
            <View>
              <ArrowIcon width={19} />
            </View>
          </TouchableOpacity>
        </ExpoLink>

        {/* Your interests */}
        <ExpoLink href="/(tabs)/settings/interests" asChild>
          <TouchableOpacity className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
            <View className="flex flex-row items-center">
              <MaterialIcons
                name="favorite-border"
                style={{ opacity: 0.6 }}
                size={20}
                color="#222222"
              />
              <Text className="ml-3">My Interests</Text>
            </View>
            <View>
              <ArrowIcon width={19} />
            </View>
          </TouchableOpacity>
        </ExpoLink>

        <TouchableOpacity
          onPress={() => logoutPrompt(queryClient)}
          className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg"
        >
          <View className="flex flex-row items-center">
            <LogoutIcon width={18} />
            <Text className="ml-3">Logout</Text>
          </View>
          <View>
            <ArrowIcon width={19} />
          </View>
        </TouchableOpacity>

        <View className="h-px bg-gray-300 my-6" />

        <Text className="text-lg mb-4 mt-2">Other</Text>

        <TouchableOpacity className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
          <View className="flex flex-row items-center">
            <PrivacyIcon width={19} />
            <Text className="ml-3">Privacy Policy</Text>
          </View>
          <View>
            <ArrowIcon width={19} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mb-4 flex p-4 h-16 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
          <View className="flex flex-row items-center">
            <AboutUsIcon width={19} />
            <Text className="ml-3">About Us</Text>
          </View>
          <View>
            <ArrowIcon width={19} />
          </View>
        </TouchableOpacity>

        <View className="h-12" />
      </View>
    </ScrollView>
  );
}
