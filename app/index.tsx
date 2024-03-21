import { View, Image, Touchable, TouchableOpacity, ScrollView } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Footer, Button } from "@/components";
import { Link as ExpoLink } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import DateChip from "@/components/chat/datechip";
import Message from "@/components/chat/message";

enum Sender {
  Me = "me",
  Her = "her",
}

export default function PreLogin() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#F6F6F6]">
      <View className="flex-1 flex justify-between pb-10 bg-white ">
        <View className="bg-[#F6F6F6] flex flex-row items-center justify-between px-6 h-20">
          <View className="flex flex-row items-center">
            <TouchableOpacity>
              <MaterialIcons name="arrow-back-ios-new" size={25} color="black" />
            </TouchableOpacity>
            <View className="w-12 h-12 p-[0.5px] rounded-full border-solid border-[2px] border-cabaret-500 ml-5">
              <Image
                source={require("@/assets/avatars/adjusted_avatar_1.png")}
                className="w-full h-full rounded-full object-contain"
              />
            </View>
            <View className="ml-3 ">
              <Text className="text-black text-lg font-medium -mt-1">John Doe</Text>
              <Text className="text-cabaret-500 -mt-[0.7px] font-semibold text-xs">
                Software Developer
              </Text>
            </View>
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={27} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 pt-6">
          <DateChip date="Today" />
          <View className="mt-6 flex items-end">
            <Message message="Hey, bartartine @ 5:00 PM ?" date={new Date()} sender={Sender.Me} />
            <Message message="Can’t Make it" date={new Date()} sender={Sender.Her} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
