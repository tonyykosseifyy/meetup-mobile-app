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
    <View className="bg-white px-2 pt-6 pb-6 relative" style={override_styles.shadow}>
      <TouchableOpacity
        onPress={() => sendRequest({ userId: item.id! })}
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
          <View className="flex flex-col">
            <Text className="font-bold text-base text-slate-950">{item.user_info?.full_name}</Text>
            <Text className="text-cabaret-800 font-light">{item.user_info?.occupation}</Text>
            <Text className="text-slate-500 text-xs mt-0.5">
              {calculateAge(item.user_info?.date_of_birth)} years old
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-slate-500 text-[12px] mx-4 mt-4">{item.user_info?.biography}</Text>

      <ScrollView horizontal={true} className="ml-4 w-full pt-3 pb-1">
        {/* map through the interests and display them as chips */ item.user_info?.interests.map(
          (interest, index) => {
            return (
              <Chip
                key={index}
                pressableClassName="py-0 px-0 mr-2"
                textClassName="ml-1"
                text={interest.name}
                onPress={() => {}}
                active={false}
                Icon={icons[interest.name] || InviteIcon}
              />
            );
          }
        )}
      </ScrollView>
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
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
});
