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
      <Text>Test</Text>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <View className="flex flex-row items-center h-full ">
                <View className="w-14 h-14 p-[0.5px] rounded-full border-solid border-2 border-cabaret-500 mx-4">
                  <Image
                    source={require("@/assets/avatars/adjusted_avatar_1.png")}
                    className="w-full h-full rounded-full object-contain"
                  />
                  <Text></Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
