import { Button } from "@/components";
import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import {
  FontAwesome6,
  FontAwesome,
  EvilIcons,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link as ExpoLink } from "expo-router";

export default function Settings() {
  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={require("@/assets/avatars/adjusted_avatar_1.png")}
        className="w-32 h-32 mx-auto mt-8 mb-2 self-center rounded-full border-solid border-2 border-cabaret-500 mx-4"
      />
      <Text className="text-center font-bold text-lg">Michelle Saliba</Text>
      <View className="mx-4">
        <Text className="text-lg mb-4">General</Text>
        <Button
          addClassName="bg-[#F2F2F2] flex flex-row place-center mb-4"
          textColor="black"
          disableShadow
          view
        >
          <View className="w-full flex flex-row justify-between place-center  ">
            <View className="flex-row">
              <View className="mr-4 ">
                <FontAwesome6 size={18} name="bell" color={"gray"} />
              </View>
              <View className="">
                <Text>Notifications</Text>
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
          <View className="w-full flex flex-row justify-between place-center">
            <View className="flex-row">
              <View className="mr-4 ">
                <EvilIcons name="location" size={24} color="gray" />
              </View>
              <View className="">
                <Text>Location</Text>
              </View>
            </View>

            <View className="">
              <Text>{">"}</Text>
            </View>
          </View>
        </Button>
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
