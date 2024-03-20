import { requestMeetings } from "@/api/axios/meetup";
import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "react-query";
import { Image } from "react-native";
import { useAuth } from "@/api/mutations/auth/AuthProvider";

export default function Tab() {
  const { isLoading, data, error } = useQuery("requestMeetings", requestMeetings);
  const { userInfo } = useAuth();
  if (isLoading) return <Text>Loading meetings...</Text>;
  console.log("ID", userInfo?.id);
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, display: "flex" }}>
        <FlatList
          data={data}
          contentContainerStyle={{}}
          renderItem={({ item }) => (
            <View className=" w-full flex-row justify-between p-4 ">
              <View className="flex  flex-row   ">
                <View className="w-14 h-14 p-[0.5px] rounded-full border-solid border-2 border-cabaret-500 ">
                  <Image
                    source={require("@/assets/avatars/adjusted_avatar_1.png")}
                    className="w-full h-full rounded-full object-contain"
                  />
                </View>
                <View className="flex justify-evenly ml-2">
                  <Text>
                    {item.request_from.id == userInfo?.id
                      ? item.request_to.user_info.full_name
                      : item.request_from.user_info.full_name}
                  </Text>
                  <Text className="text-[12px]">Last request bartartine - 5:00 PM</Text>
                </View>
              </View>
              <Text>5:00 AM</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
