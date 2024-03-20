import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useQuery } from "react-query";
import { lookup } from "@/api/axios/users";
import { IUser } from "@/interfaces";
import { Friend } from "@/components/friend";

export interface CardProps {
  item: IUser;
}

const renderItem = ({ item }: CardProps) => {
  return <Friend item={item} />;
};

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: "/meetup/users/",
    queryFn: lookup,
    retry: 2,
  });

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
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#d14d72" />
          </View>
        )}
        {data && (
          <FlatList
            data={data} // Assuming the fetched data is an object with a 'users' array
            renderItem={renderItem}
            keyExtractor={(item) => item.email} // Ensure 'item.id' is a unique identifier
          />
        )}
        {!data && !isLoading && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-black font-bold">No users found</Text>
            <Text className="text-black">Please try again later</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
