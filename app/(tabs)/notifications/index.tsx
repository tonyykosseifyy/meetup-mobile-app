import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import { Image } from "react-native";
import { router } from "expo-router";
import Meetup from "@/api/meetup.api";
import Auth from "@/api/auth.api";
import { API_URL } from "@/api/utils/abstract-api";
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
  const meetupApi = Meetup.getInstance();
  const authApi = Auth.getInstance();

  const { data, isLoading } = useQuery({
    queryKey: "/meetup/me/meeting-requests/",
    queryFn: () => meetupApi.requestMeetings({}),
  });

  const { data: userInfo } = useQuery({
    queryKey: "getMe",
    queryFn: () => authApi.getMe(),
  });

  return (
    <View style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
      {isLoading ? (
        <View className="w-full flex-1 h-full flex flex-row items-center justify-center">
          <ActivityIndicator size="large" color="#d14d72" />
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
                  {/* <View className="w-14 h-14 p-[0.5px] rounded-full border-solid border-2 border-cabaret-500 ">
                    <Image
                      source={require("@/assets/avatars/adjusted_avatar_1.png")}
                      className="w-full h-full rounded-full object-contain"
                    />
                  </View> */}

                  <View className="w-12 h-12 p-1 bg-cabaret-100 rounded-xl border-solid border border-cabaret-400 mx-2">
                    <Image
                      // source={require("@/assets/avatars/adjusted_avatar_1.png")}
                      source={{ uri: `${API_URL}${item.request_to.user_info.avatar?.image_url}` }}
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
