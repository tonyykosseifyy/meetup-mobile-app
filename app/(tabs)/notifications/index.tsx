import { requestMeetings } from "@/api/axios/meetup";
import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "react-query";
import { Image } from "react-native";
import { useAuth } from "@/api/mutations/auth/AuthProvider";
import { router } from "expo-router";
import { getMe } from "@/api/axios/users";
import { formatTimeTo12Hour } from "@/utils/common";

// interface MeetupRequestResponse {
//   id: number;
//   request_from: IUser;
//   request_to: IUser;
//   status: string;
//   time_slots: any[];
//   place_requests: any[];
//   request_to_accepting: boolean;
//   request_from_accepting: boolean;
// }

export default function Tab() {
  const { isLoading, data, error } = useQuery("/meetup/me/meeting-requests/", requestMeetings);
  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: "/auth/userinfo/",
    retry: 2,
    queryFn: () => getMe(),
  });

  return (
    <View style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-400">Loading...</Text>
        </View>
      ) : data?.length == 0 && !isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-400">No meetings request yet.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{}}
          ItemSeparatorComponent={() => <View className="bg-[#F2F2F2]  w-full h-[1px]" />}
          renderItem={({ item }) => (
            <TouchableOpacity
              disabled={
                item.status !== "waiting" &&
                !(item.status === "pending" && item.request_to.id === userInfo?.id)
              }
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/notifications/chat",
                  params: { meetingId: item.id },
                })
              }
            >
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
                    {item.status === "waiting" && item.place_time_requests.length >= 1 ? (
                      <Text className="text-gray-400">
                        Last request{" "}
                        {item.place_time_requests[item.place_time_requests.length - 1].place.name} -{" "}
                        {item.place_time_requests[item.place_time_requests.length - 1].time.slot}
                      </Text>
                    ) : item.status === "pending" ? (
                      <Text className="text-gray-400 text-[12px]">
                        {item.request_from.id == userInfo?.id
                          ? "Waiting for response from " + item.request_to.user_info.full_name
                          : "You haves pending request from " +
                            item.request_from.user_info.full_name}
                      </Text>
                    ) : item.status === "waiting" ? (
                      <Text className="text-gray-400">Waiting for place and time</Text>
                    ) : item.status === "accepted" ? (
                      <Text className="text-cabaret-500">
                        Accepted meeting at {item.place_time_requests[0].place.name} -{" "}
                        {item.place_time_requests[0].time.slot}
                      </Text>
                    ) : item.status === "declined" ? (
                      <Text className="text-red-500 font-bold">Meeting Declined</Text>
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
      )}
    </View>
  );
}
