import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Chip from "@/components/chip";
import styles from "@/constants/styles";
import { icons } from "@/app/(auth)/signup-interests/data";
import { useMutation, useQuery } from "react-query";
import { IInterest } from "@/interfaces";
import { useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import Auth from "@/api/auth.api";
import Meetup from "@/api/meetup.api";

export default function SettingsInterests() {
  const authApi = Auth.getInstance();
  const meetupApi = Meetup.getInstance();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [updatedInterests, setUpdatedInterests] = useState<IInterest[]>([]);

  const toggleInterest = (interest: IInterest) => {
    if (updatedInterests.findIndex((i) => i.id === interest.id) !== -1) {
      setUpdatedInterests(updatedInterests.filter((i) => i.id !== interest.id));
    } else {
      setUpdatedInterests([...updatedInterests, interest]);
    }
  };

  // fetching interests
  const { data: interests, isLoading: isLoadingAllInterests } = useQuery({
    queryKey: "/meetup/interests/",
    queryFn: () => meetupApi.getAllInterests(),
  });

  // mutate function to update interests
  const { isLoading: isSendingLoading, mutate: sendInterests } = useMutation({
    mutationFn: () => authApi.setInterests(updatedInterests),
    mutationKey: "/auth/userinfo/update",
    onSuccess: (data) => {
      Alert.alert("Your Interests", "Your Interests are updated successfully", [
        {
          text: "OK",
          onPress: () => {
            queryClient.invalidateQueries("getMe");
            navigation.goBack();
          },
        },
      ]);
    },
  });
  // fetching user info
  const {
    data: userInfo,
    isLoading: isUserLoading,
    isFetching,
  } = useQuery({
    queryKey: "getMe",
    refetchOnMount: true,
    queryFn: () => authApi.getMe(),
  });

  useEffect(() => {
    if (userInfo && userInfo.interests) {
      setUpdatedInterests(userInfo.interests);
    }
  }, [userInfo]);

  const loadingUserInterests = useMemo(
    () => isUserLoading || isLoadingAllInterests || isFetching,
    [isUserLoading, isLoadingAllInterests, isFetching]
  );

  return (
    <View className="flex-1 bg-white flex">
      <View className="flex-1 bg-white flex">
        <View className="px-5 flex-1 mt-6">
          <View>
            <Text className="text-black font-medium text-2xl">Update Your Interests</Text>
            <Text className="text-slate-700 mt-1 leading-5">
              Tell us about your interests and what excite you
            </Text>
          </View>

          {!loadingUserInterests && interests && Array.isArray(interests) && (
            <View className="mt-20 flex-1 w-full justify-between pb-28 ">
              <View className="flex  flex-row justify-center flex-wrap  w-full">
                {interests.map((interest) => (
                  <Chip
                    onPress={() => toggleInterest(interest)}
                    key={interest.id}
                    active={
                      // check if this interest id belong to the user interests
                      updatedInterests.findIndex((i) => i.id === interest.id) !== -1 ? true : false
                    }
                    text={interest.name}
                    Icon={icons[interest.name]}
                    shadow
                  />
                ))}
              </View>
            </View>
          )}
          {loadingUserInterests && (
            <View className="w-full flex-1 h-full flex flex-row items-center justify-center">
              <ActivityIndicator size="large" color="#d14d72" />
            </View>
          )}
          {!loadingUserInterests && (
            <TouchableOpacity
              onPress={() => sendInterests()}
              disabled={isSendingLoading || updatedInterests.length < 3}
              style={styles.cabaret_shadow}
              className={`p-2  mb-4 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center ${updatedInterests.length < 3 && "bg-cabaret-400"}`}
            >
              <Text className="text-white font-bold text-base">
                {isSendingLoading ? "Saving..." : "Update Interests"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
