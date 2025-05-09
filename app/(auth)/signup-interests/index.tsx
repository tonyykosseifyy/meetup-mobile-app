import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Header } from "@/components";
import Chip from "@/components/chip";
import styles from "@/constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { interests, icons } from "./data";
import { useMutation, useQuery } from "react-query";
import { router } from "expo-router";
import { IInterest } from "@/interfaces";
import Auth from "@/api/services/auth/auth.api";
import Meetup from "@/api/services/meetup/meetup.api";

// const Skip = (): React.JSX.Element => (
//   <TouchableOpacity>
//     <Text className="text-cabaret-500 font-bold">Skip</Text>
//   </TouchableOpacity>
// );

export default function SignUpOtp() {
  const [selectedInterests, setSelectedInterests] = useState<IInterest[]>([]);
  const authApi = Auth.getInstance();
  const meetupApi = Meetup.getInstance();

  const toggleInterest = (interest: IInterest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  const loading = true;

  const { data, isLoading } = useQuery({
    queryKey: "/meetup/interests/",
    retry: 2,
    queryFn: () => meetupApi.getAllInterests(),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { isLoading: isSendingLoading, mutate: sendInterests } = useMutation({
    mutationFn: () => authApi.setInterests(selectedInterests),
    mutationKey: "/auth/userinfo/",
    onSuccess: (data) => {
      console.log(data);
      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/choose-avatar");
    },
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <Header
          // leftButton
          theme={"light"}
        />
        <View className="px-5 flex-1">
          <View className="mt-7">
            <Text className="text-black font-medium text-2xl">Select up to 3 interest</Text>
            <Text className="text-slate-700 mt-1 leading-5">
              Tell us about your interests and what excite you
            </Text>
          </View>

          {data && Array.isArray(data) && (
            <View className="mt-20 flex-1 w-full justify-between pb-28 ">
              <View className="flex flex-row justify-center flex-wrap w-full">
                {data.map((interest) => (
                  <Chip
                    onPress={() => toggleInterest(interest)}
                    key={interest.id}
                    active={selectedInterests.includes(interest)}
                    text={interest.name}
                    Icon={icons[interest.name]}
                    shadow
                  />
                ))}
              </View>
            </View>
          )}
          {isLoading && (
            <View className="w-full flex-1 h-full flex flex-row items-center justify-center">
              <ActivityIndicator size="large" color="#d14d72" />
            </View>
          )}
          {data && Array.isArray(data) && (
            <TouchableOpacity
              onPress={() => sendInterests()}
              disabled={isSendingLoading || isLoading || selectedInterests.length < 3}
              style={styles.cabaret_shadow}
              className={`p-2 mb-16 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center ${selectedInterests.length < 3 && "bg-cabaret-400"}`}
            >
              <Text className="text-white font-bold text-base">
                {isSendingLoading ? "Saving..." : "Continue"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
