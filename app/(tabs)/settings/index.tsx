import { Button } from "@/components";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, Touchable, TouchableOpacity, Switch } from "react-native";
import {
  FontAwesome6,
  FontAwesome,
  EvilIcons,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link as ExpoLink } from "expo-router";
import NotificationsIcon from "@/assets/icons/settings/notifications.svg";
import ArrowIcon from "@/assets/icons/settings/arrow.svg";
import LocationIcon from "@/assets/icons/settings/location.svg";

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
              style={{transform: "scale(0.9)"}}
            />
          </View>
        </View>

        <View className="h-px bg-gray-300 my-2" />
        <Text className="text-lg mb-4">Account Information</Text>
        <ExpoLink href="/settings/account-details" asChild>
          <Button
            addClassName="bg-[#F2F2F2] flex flex-row place-center mb-4"
            textColor="black"
            disableShadow
            view
          >
            <View className="w-full flex flex-row justify-between place-center">
              <View className="flex-row">
                <View className="mr-4 ">
                  <FontAwesome name="user-o" size={20} color="gray" />
                </View>
                <View className="">
                  <Text>Account Details</Text>
                </View>
              </View>

              <View className="">
                <Text>{">"}</Text>
              </View>
            </View>
          </Button>
        </ExpoLink>

        <Button
          addClassName="bg-[#F2F2F2] flex flex-row place-center mb-4"
          textColor="black"
          disableShadow
          view
        >
          <View className="w-full flex flex-row justify-between place-center">
            <View className="flex-row">
              <View className="mr-4 ">
                <Ionicons name="exit-outline" size={24} color="gray" />
              </View>
              <View className="">
                <Text>Logout</Text>
              </View>
            </View>

            <View className="">
              <Text>{">"}</Text>
            </View>
          </View>
        </Button>
        <View className="h-px bg-gray-300 my-2" />
        <Text className="text-lg mb-4">Account Information</Text>
        <Button
          addClassName="bg-[#F2F2F2] flex flex-row place-center mb-4"
          textColor="black"
          disableShadow
          view
        >
          <View className="w-full flex flex-row justify-between place-center">
            <View className="flex-row">
              <View className="mr-4 ">
                <Octicons name="shield-check" size={24} color="gray" />
              </View>
              <View className="">
                <Text>Privacy Policy</Text>
              </View>
            </View>

            <View className="">
              <Text>{">"}</Text>
            </View>
          </View>
        </Button>
        <Button
          addClassName="bg-[#F2F2F2] flex flex-row place-center mb-4"
          textColor="black"
          disableShadow
          view
        >
          <View className="w-full bg flex flex-row justify-between place-center">
            <View className="flex-row">
              <View className="mr-4 ">
                <MaterialCommunityIcons name="information-variant" size={24} color="gray" />
              </View>
              <View className="">
                <Text>Logout</Text>
              </View>
            </View>

            <View className="">
              <Text>{">"}</Text>
            </View>
          </View>
        </Button>
        <View className="h-px bg-gray-300 my-2" />
      </View>
    </ScrollView>
  );
}
