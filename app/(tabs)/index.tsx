import React from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import Chip from "@/components/chip";
import ReadingIcon from "@/assets/icons/interests/reading.svg";
import PhotographyIcon from "@/assets/icons/interests/photography.svg";
import CharityIcon from "@/assets/icons/interests/charity.svg";
import { ScrollView } from "react-native";
import styles from "@/constants/styles";
import InviteIcon from "@/assets/icons/home/invite.svg";
import { useQuery } from "react-query";
import { lookup } from "@/api/users";
import { AxiosError } from "axios";

const renderItem = () => {
  // request to get the users
  return (
    <View className="bg-white px-2 pt-6 pb-6 relative" style={override_styles.shadow}>
      <TouchableOpacity
        onPress={() => console.log("pressed")}
        className="absolute z-10 top-8 right-5 w-12 h-8 flex-row justify-end"
      >
        <InviteIcon />
      </TouchableOpacity>
      <View className="flex flex-row items-center mb-2">
        <View className="flex flex-row items-center h-full ">
          <View className="w-14 h-14 p-[0.5px] rounded-full border-solid border-2 border-cabaret-500 mx-4">
            <Image
              source={require("@/assets/avatars/adjusted_avatar_1.png")}
              className="w-full h-full rounded-full object-contain"
            />
          </View>
        </View>

        <View className="flex flex-1">
          <Text className="font-bold text-base">
            Michelle Saliba, <Text className="text-cabaret-500">35</Text>
          </Text>
          <Text className="text-cabaret-500 font-bold">Lawyer</Text>
        </View>
      </View>
      <Text className="text-slate-500 text-[12px] mx-4 mt-4">
        Fun and adventurous. I'm not afraid to try new things and I love to be spontaneous
      </Text>

      <ScrollView horizontal={true} className="ml-4 w-full pt-3 pb-1">
        <Chip
          pressableClassName="py-0 px-0"
          textClassName="ml-1"
          text=""
          onPress={() => {}}
          active={false}
          Icon={CharityIcon}
        />
        <Chip
          pressableClassName="py-0 px-0"
          textClassName="ml-1"
          text=""
          onPress={() => {}}
          active={false}
          Icon={ReadingIcon}
        />
        <Chip
          pressableClassName="py-0 px-0"
          textClassName="ml-1"
          text=""
          onPress={() => {}}
          active={false}
          Icon={PhotographyIcon}
        />
        <Chip
          pressableClassName="py-0 px-0"
          textClassName="ml-1"
          text=""
          onPress={() => {}}
          active={false}
          Icon={CharityIcon}
        />
        <Chip
          pressableClassName="py-0 px-0"
          textClassName="ml-1"
          text=""
          onPress={() => {}}
          active={false}
          Icon={ReadingIcon}
        />
        <Chip
          pressableClassName="py-0 px-0"
          textClassName="ml-1"
          text=""
          onPress={() => {}}
          active={false}
          Icon={PhotographyIcon}
        />
      </ScrollView>
      <View className="flex flex-row w-full justify-end ">
        {/* <TouchableOpacity className="border-b-[0.5px] border-cabaret-500 mr-4 flex-row">
          <InviteIcon fill={"#d14d72"} />
          <Text className="font-bold text-cabaret-500 text-sm">Invite</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default function Home() {
  const { isLoading, error, data: users } = useQuery("lookup", lookup);

  if (isLoading) return <Text>Loading users...</Text>;
  if (error as AxiosError) {
    console.log("error=>>>");
    console.log(error);

    return <Text>Error: </Text>;
  }
  if (!users) return <Text>No users found</Text>;
  console.log(users);

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
          <TouchableOpacity
            style={styles.grey_shadow}
            className="ml-4 flex-1 bg-white flex flex-row justify-center p-4 relative rounded-full"
          >
            <Text className="text-black font-bold">Nearby</Text>
          </TouchableOpacity>
        </View>

        <FlatList className="py-4" data={new Array(3).fill(0)} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}

const override_styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
});
