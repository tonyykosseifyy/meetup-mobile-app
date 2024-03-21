import { requestMeetings } from "@/api/axios/meetup";
import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "react-query";
import { Image } from "react-native";
import { useAuth } from "@/api/mutations/auth/AuthProvider";
import { router } from "expo-router";

function formatTimeTo12Hour(datetimeStr: string): string {
  const date = new Date(datetimeStr);

  // Extract hours and minutes
  let hours = date.getUTCHours(); // Use getUTCHours() to get the time in UTC
  const minutes = date.getUTCMinutes(); // Use getUTCMinutes() for minutes in UTC

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format minutes to be always two digits
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Construct formatted time string
  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}

export default function Tab() {
  const { isLoading, data, error } = useQuery("requestMeetings", requestMeetings);
  const { registeredUser } = useAuth();
  if (isLoading) return <Text>Loading meetings...</Text>;

  return (
    <View style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
      <FlatList
        data={data}
        contentContainerStyle={{}}
        ItemSeparatorComponent={() => <View className="bg-[#F2F2F2]  w-full h-[1px]" />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push("/(tabs)/notifications/chat")}>
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
                    {item.request_from.id == registeredUser?.id
                      ? item.request_to.user_info.full_name
                      : item.request_from.user_info.full_name}
                  </Text>
                  {item.status === "waiting" && item.place_time_requests.length >= 1 ? (
                    <Text className="text-gray-400">
                      Last request {item.place_time_requests[0].place.name} -{" "}
                      {item.place_time_requests[0].time.slot}
                    </Text>
                  ) : item.status === "pending" ? (
                    <Text className="text-gray-400">
                      {item.request_from.id == registeredUser?.id
                        ? "Waiting for response from " + item.request_to.user_info.full_name
                        : "You have pending request from " + item.request_from.user_info.full_name}
                    </Text>
                  ) : item.status === "waiting" ? (
                    <Text className="text-gray-400">Waiting for place and time</Text>
                  ) : item.status === "accepted" ? (
                    <Text className="text-cabaret-500">
                      Accepted meeting at {item.place_time_requests[0].place.name} -{" "}
                      {item.place_time_requests[0].time.slot}
                    </Text>
                  ) : null}
                </View>
              </View>
              {/* {(item.place_requests.length >= 1 || item.time_slots.length >= 1) &&
                (new Date(item.place_requests[0].requested_at) >
                new Date(item.time_slots[0].requested_at) ? (
                  <Text className="text-gray-400">
                    {formatTimeTo12Hour(item.place_requests[0].requested_at)}
                  </Text>
                ) : (
                  <Text className="text-gray-400">
                    {formatTimeTo12Hour(item.time_slots[0].requested_at)}
                  </Text>
                ))} */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
