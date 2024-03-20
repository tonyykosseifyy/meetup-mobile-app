import React from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import Chip from "@/components/chip";
import CharityIcon from "@/assets/icons/interests/charity.svg";
import { ScrollView } from "react-native";
import styles from "@/constants/styles";
import InviteIcon from "@/assets/icons/home/invite.svg";
import { useQuery } from "react-query";
import { lookup } from "@/api/axios/users";
import { IUser } from "@/interfaces";
import { calculateAge } from "@/utils/common";
import { useMutation } from "react-query";
import { requestMeeting } from "@/api/axios/meetup";
import { Friend } from "@/components/friend";

export interface CardProps {
  item: IUser;
}

const renderItem = ({ item }: CardProps) => {
  return <Friend item={item} />;
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
          data={data} // Assuming the fetched data is an object with a 'users' array
          renderItem={renderItem}
          keyExtractor={(item) => item.email} // Ensure 'item.id' is a unique identifier
        />
      </View>
    </SafeAreaView>
  );
}
