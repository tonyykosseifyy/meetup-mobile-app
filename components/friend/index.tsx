import React from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import Chip from "@/components/chip";
import CharityIcon from "@/assets/icons/interests/charity.svg";
import { ScrollView, StyleSheet } from "react-native";
import InviteIcon from "@/assets/icons/home/invite.svg";
import { calculateAge } from "@/utils/common";
import { CardProps } from "../../app/(tabs)";
import { useMutation } from "react-query";
import { requestMeeting } from "@/api/axios/meetup";

export const Friend = ({ item }: CardProps) => {
  const { mutate: sendRequest, isLoading } = useMutation(requestMeeting);

  const handleSubmit = ({ userId }: { userId: number }) => {
    sendRequest(
      { userId },
      {
        onSuccess: () => {
          Alert.alert("Request sent", "Your request has been sent successfully");
        },
      }
    );
  };
  return (
    <View className="bg-white px-2 pt-6 pb-6 relative" style={override_styles.shadow}>
      <TouchableOpacity
        onPress={() => handleSubmit({ userId: item.id! })}
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
          <Text className="font-bold text-base">
            {item.user_info?.full_name},{" "}
            <Text className="text-cabaret-500">
              {/* generate the age, dateofbirht - local date */}
              {calculateAge(item.user_info?.date_of_birth)}
            </Text>
          </Text>
          <Text className="text-cabaret-500 font-bold">{item.user_info?.occupation}</Text>
        </View>
      </View>
      <Text className="text-slate-500 text-[12px] mx-4 mt-4">{item.user_info?.biography}</Text>

      <ScrollView horizontal={true} className="ml-4 w-full pt-3 pb-1">
        {/* map through the interests and display them as chips */ item.user_info?.interests.map(
          (interest, index) => {
            return (
              <Chip
                key={index}
                pressableClassName="py-0 px-0"
                textClassName="ml-1"
                text={interest}
                onPress={() => {}}
                active={false}
                Icon={CharityIcon}
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
