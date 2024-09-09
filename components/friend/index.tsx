import React from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import Chip from "@/components/chip";
import { ScrollView, StyleSheet } from "react-native";
import InviteIcon from "@/assets/icons/home/invite.svg";
import { calculateAge } from "@/utils/common";
import { CardProps } from "../../app/(tabs)";
import { useMutation, useQueryClient } from "react-query";
import { requestMeeting } from "@/api/axios/meetup";
import { icons } from "@/app/(auth)/signup-interests/data";
import { MeetupRequestResponse, RequestMeetingsResponse } from "@/interfaces/meetup.interface";
import { router } from "expo-router";

export const Friend = ({ item }: CardProps) => {
  const queryClient = useQueryClient();

  const { mutate: sendRequest, isLoading } = useMutation<
    {
      meeting_request: MeetupRequestResponse;
    },
    unknown,
    {
      userId: number;
    }
  >({
    mutationFn: ({ userId }) => {
      return requestMeeting({ userId });
    },
    mutationKey: "/meetup/meeting-requests/place-time-requests/",
    retry: false,
    onSuccess: async ({ meeting_request }) => {
      // test

      await queryClient.invalidateQueries("/meetup/users/", {
        refetchInactive: true,
      });
      await queryClient.invalidateQueries("/meetup/me/meeting-requests/", {
        refetchInactive: true,
      });
      Alert.alert("Success", "Request sent successfully");
    },
  });

  return (
    <View
      className="bg-white my-2 mx-2 px-2 pt-5 pb-6 relative rounded-3xl"
      style={override_styles.shadow}
    >
      <TouchableOpacity
        onPress={() => sendRequest({ userId: item.id! })}
        className="absolute z-10 top-8 right-5 w-12 h-8 flex-row justify-end"
      >
        <InviteIcon />
      </TouchableOpacity>
      <View className="flex flex-row items-center mb-2">
        <View className="flex flex-row items-center h-full">
          <View className="w-14 h-14 p-1 bg-cabaret-100 rounded-xl border-solid border border-cabaret-400 mx-2">
            <Image
              source={require("@/assets/avatars/adjusted_avatar_1.png")}
              className="w-full h-full rounded-full object-contain"
            />
          </View>
        </View>

        <View className="flex flex-1 ml-1">
          <View className="flex flex-col">
            <Text className="font-semibold text-[15px] text-slate-950">
              {item.user_info?.full_name},
              <Text className="text-cabaret-800 font-light"> {item.user_info?.occupation}</Text>
            </Text>

            <Text className="text-slate-500 font-light text-xs mt-[0.5px]">
              {calculateAge(item.user_info?.date_of_birth)} years old
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full flex flex-row justify-center mt-2 px-2">
        <View className="w-[100%] h-[1.5px] bg-slate-100 rounded-full"></View>
      </View>
      {/* About me */}
      <View className="relative w-fit max-w-fit flex flex-col mt-4">
        <Text className="text-cabaret-600 font-medium text-sm ml-2 mr-4">About me:</Text>
        <View className="absolute w-7 -bottom-0.5 h-[1.5px] bg-cabaret-500 rounded-full ml-2 mr-4 mt-1"></View>
      </View>

      <Text className="text-slate-500 text-[13px] leading-5 ml-2 mr-4 mt-3">
        {item.user_info?.biography} 
      </Text>

      <View className="w-full flex flex-row justify-center mt-5 px-2">
        <View className="w-[100%] h-[1.5px] bg-slate-100 rounded-full"></View>
      </View>

      {/* My Interests */}
      <View className="relative w-fit max-w-fit flex flex-col mt-1">
        <Text className="text-cabaret-600 font-medium text-sm ml-2 mr-4 mt-4">Things I Enjoy:</Text>
        <View className="absolute w-12 -bottom-0.5 h-[1.5px] bg-cabaret-500 rounded-full ml-2 mr-4 mt-1"></View>
      </View>
      <View className="w-full mt-2 flex flex-row flex-wrap">
        {/* map through the interests and display them as chips */ item.user_info?.interests.map(
          (interest, index) => {
            return (
              <Chip
                key={index}
                pressableClassName="p-1 px-3 bg-cabaret-100"
                textClassName="ml-1 text-[10px] text-cabaret-800"
                text={interest.name}
                onPress={() => {}}
                active={false}
                Icon={icons[interest.name] || InviteIcon}
              />
            );
          }
        )}
      </View>
    </View>
  );
};

const override_styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
