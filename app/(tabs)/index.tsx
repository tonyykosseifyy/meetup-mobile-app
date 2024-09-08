import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useQuery } from "react-query";
import { IUser } from "@/interfaces";
import { Friend } from "@/components/friend";
import Auth from "@/api/auth.api";
import Meetup from "@/api/meetup.api";

export interface CardProps {
  item: IUser;
}

enum TabType {
  FOR_YOU = "For You",
  NEARBY = "Nearby",
}

const renderItem = ({ item }: CardProps) => {
  if (item.user_info) {
    return <Friend item={item} />;
  } else {
    return <></>;
  }
};

export default function Home() {
  const meetupApi = Meetup.getInstance();

  const [activeTab, setActiveTab] = useState<TabType>(TabType.FOR_YOU);

  const fetchUsers = useCallback(async () => {
    switch (activeTab) {
      case TabType.FOR_YOU:
        return meetupApi.getForYouLookup();
      case TabType.NEARBY:
        return meetupApi.getNearbyLookup();
      default:
        return [];
    }
  }, [activeTab, meetupApi]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["/meetup/users/", activeTab],
    queryFn: fetchUsers,
    onSuccess: (data) => {
      // console.log("Data fetched successfully", data);
    },
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1">
        <View className="pt-4 pb-4">
          <LogoNavbar />
        </View>

        <View className="flex flex-row items-center justify-center w-4/5 mx-auto mb-5 mt-2">
          <TouchableOpacity
            className={`flex-1 flex flex-row justify-center p-4 relative rounded-full ${
              activeTab === TabType.FOR_YOU ? "bg-cabaret-500" : "bg-white"
            }`}
            style={activeTab === TabType.FOR_YOU ? {} : styles.grey_shadow}
            onPress={() => setActiveTab(TabType.FOR_YOU)}
          >
            <Text
              className={
                activeTab === TabType.FOR_YOU ? "text-white font-bold" : "text-black font-bold"
              }
            >
              For You
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === TabType.NEARBY ? {} : styles.grey_shadow}
            className={`ml-4 flex-1 flex flex-row justify-center p-4 relative rounded-full ${
              activeTab === TabType.NEARBY ? "bg-cabaret-500" : "bg-white"
            }`}
            onPress={() => setActiveTab(TabType.NEARBY)}
          >
            <Text
              className={
                activeTab === TabType.NEARBY ? "text-white font-bold" : "text-black font-bold"
              }
            >
              Nearby
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#d14d72" />
          </View>
        )}
        {data && data.length > 0 && (
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.email} />
        )}
        {data?.length === 0 && !isLoading && (
          <View className="flex-1 justify-center items-center">
            <Image
              source={require("@/assets/images/no-user-found.png")}
              className="w-32 h-32 mb-5"
            />
            <Text className="text-cabaret-950 text-base text-center">Oops! No Users Found</Text>
            <Text className="text-slate-600 mt-2 text-center text-sm w-[80%]">
              Give it another shot or check back soon—we’re always updating!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
