import { Button } from "@/components";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Link as ExpoLink } from "expo-router";
import NotificationsIcon from "@/assets/icons/settings/notifications.svg";
import ArrowIcon from "@/assets/icons/settings/arrow.svg";
import LocationIcon from "@/assets/icons/settings/location.svg";
import AccountDetailsIcon from "@/assets/icons/settings/account-details.svg";
import LogoutIcon from "@/assets/icons/settings/logout.svg";
import PrivacyIcon from "@/assets/icons/settings/privacy.svg";
import AboutUsIcon from "@/assets/icons/settings/aboutus.svg";

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/sample_avatar.png")}
        className="w-32 h-32 mt-8 mb-2 self-center rounded-full border-solid border-2 border-cabaret-500 mx-4"
      />
      <Text className="text-center font-bold text-lg">Michelle Saliba</Text>
      <View className="mx-4 mt-6">
        <Text className="text-lg mb-4">General</Text>

        <TouchableOpacity className="mb-4 flex p-4 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
          <View className="flex flex-row items-center">
            <NotificationsIcon width={19} />
            <Text className="ml-3">Notifications</Text>
          </View>
          <View>
            <ArrowIcon width={19} />
          </View>
        </TouchableOpacity>

        <View className="mb-4 flex p-4 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
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

        <ExpoLink href="/(tabs)/settings/account-details" asChild>
          <TouchableOpacity className="mb-4 flex p-4 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
            <View className="flex flex-row items-center">
              <AccountDetailsIcon width={19} />
              <Text className="ml-3">Account Details</Text>
            </View>
            <View>
              <ArrowIcon width={19} />
            </View>
          </TouchableOpacity>
        </ExpoLink>

        <TouchableOpacity className="mb-4 flex p-4 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
          <View className="flex flex-row items-center">
            <LogoutIcon width={19} />
            <Text className="ml-3">Logout</Text>
          </View>
          <View>
            <ArrowIcon width={19} />
          </View>
        </TouchableOpacity>

        <View className="h-px bg-gray-300 my-6" />

        <Text className="text-lg mb-4 mt-2">Other</Text>

        <TouchableOpacity className="mb-4 flex p-4 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
          <View className="flex flex-row items-center">
            <PrivacyIcon width={19} />
            <Text className="ml-3">Privacy Policy</Text>
          </View>
          <View>
            <ArrowIcon width={19} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mb-4 flex p-4 flex-row items-center justify-between bg-[#F2F2F2] rounded-lg">
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
