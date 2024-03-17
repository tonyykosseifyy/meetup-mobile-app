import React from "react";
import { useState } from "react";
import { View, Image, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Header, Footer, Button } from "@/components";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";

const renderItem = () => {
  return (
    <View className="bg-white px-2 py-6 mb-4" style={styles.grey_shadow}>
      <View className="flex flex-row items-center">
        <Image
          source={require("@/assets/images/sample_avatar.png")}
          className="w-16 h-16  rounded-full border-solid border-2 border-cabaret-500 mx-4"
        />
        <View className="flex flex-1 gap-2 mb-4">
          <Text className="font-bold">
            Michelle Saliba, <Text className="text-cabaret-500">35</Text>
          </Text>
          <Text className="text-cabaret-500 font-bold">Lawyer</Text>
          <Text className="text-slate-500 text-[12px]">
            Fun and adventurous. I'm not afraid to try new things and I love to be spontaneous
          </Text>
        </View>
      </View>
      <View className="flex-row flex-wrap mt-4 justify-start gap-2">
        <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-[#D9D9D9]">
          <MaterialCommunityIcons name="charity" size={16} color="black" />
          <Text className="ml-2 text-[12px]">Charity</Text>
        </View>
        <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-slate-200">
          <MaterialCommunityIcons name="charity" size={16} color="black" />
          <Text className="ml-2 text-[12px]">Charity</Text>
        </View>
        <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-slate-200">
          <MaterialCommunityIcons name="charity" size={16} color="black" />
          <Text className="ml-2 text-[12px]">Charity</Text>
        </View>
        <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-slate-200">
          <MaterialCommunityIcons name="charity" size={16} color="black" />
          <Text className="ml-2 text-[12px]">Charity</Text>
        </View>
      </View>
    </View>
  );
};

export default function Home() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1">
        <View className="pt-4 pb-4">
          <LogoNavbar />
        </View>

        <View className="flex flex-row items-center justify-center w-4/5 mx-auto mb-5 mt-2">
          <TouchableOpacity className="flex-1 bg-cabaret-500 flex flex-row justify-center p-4 relative rounded-full">
            <Text className="text-white font-bold">For You</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.grey_shadow} className="ml-4 flex-1 bg-white flex flex-row justify-center p-4 relative rounded-full">
            <Text className="text-black font-bold">Nearby</Text>
          </TouchableOpacity>
        </View>

        <FlatList className="py-4" data={new Array(3).fill(0)} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}

