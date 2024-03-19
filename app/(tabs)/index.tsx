import React from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import Chip from "@/components/chip";
import CharityIcon from "@/assets/icons/interests/charity.svg";
import { ScrollView } from "react-native";
import styles from "@/constants/styles";
import InviteIcon from "@/assets/icons/home/invite.svg";
import { useQuery } from "react-query";
import { lookup } from "@/api/users";
import { IUser } from "@/api/interfaces";

function calculateAge(birthDate: string | Date | number): number {
  const birthday = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}

interface CardProps {
  item: IUser;
}

const renderItem = ({ item }: CardProps) => {
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
            {item.user_info?.full_name},{" "}
            <Text className="text-cabaret-500">
              {/* generate the age, dateofbirht - local date */}
              {calculateAge(item.user_info?.date_of_birth)}
            </Text>
          </Text>
          <Text className="text-cabaret-500 font-bold">{item.user_info?.occupation}</Text>
        </View>
      </View>
      <Text className="text-slate-500 text-[12px] mx-4 mt-4">{item.user_info?.biography}</Text>

      <ScrollView horizontal={true} className="ml-4 w-full pt-3 pb-1">
        {/* map through the interests and display them as chips */
        item.user_info?.interests.map((interest, index) => {
          return (
            <Chip
              key={index}
              pressableClassName="py-0 px-0"
              textClassName="ml-1"
              text={interest}
              onPress={() => {}}
              active={false}
              Icon={CharityIcon}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default function Home() {
  const { isLoading, error, data } = useQuery("lookup", lookup);

  if (isLoading) return <Text>Loading users...</Text>;
  if (error) {
    console.error("Error fetching users:", error);
    return <Text>Error fetching users.</Text>;
  }

  if (!data) return <Text>No users found</Text>;

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

        <FlatList
          data={data.data} // Assuming the fetched data is an object with a 'users' array
          renderItem={renderItem}
          keyExtractor={(item) => item.email} // Ensure 'item.id' is a unique identifier
        />
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
