import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Header } from "@/components";
import Chip from "@/components/chip";
import styles from "@/constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { interests, icons } from "./data";
import { useMutation, useQuery } from "react-query";
import { getInterests, setInterests } from "@/api/services/interests";
import { router } from "expo-router";
import { IInterest } from "@/interfaces";

// const Skip = (): React.JSX.Element => (
//   <TouchableOpacity>
//     <Text className="text-cabaret-500 font-bold">Skip</Text>
//   </TouchableOpacity>
// );

export default function SignUpOtp() {
  const [selectedInterests, setSelectedInterests] = useState<IInterest[]>([]);

  const toggleInterest = (interest: IInterest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: "/meetup/interests/",
    retry: 2,
    queryFn: () => getInterests(),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { isLoading: isSendingLoading, mutate: sendInterests } = useMutation({
    mutationFn: () => setInterests(selectedInterests),
    mutationKey: "/auth/userinfo/",
    onSuccess: (data) => {
      console.log(data);
      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/(tabs)");
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
            <Text className="text-slate-800 mt-1 leading-5">
              Tell us about your interests and what excite you
            </Text>
          </View>

          <View className="mt-20 flex-1 w-full justify-between pb-28">
            <View className="flex flex-row justify-center flex-wrap h-64 w-full">
              {data &&
                Array.isArray(data) &&
                data.map((interest) => (
                  <Chip
                    onPress={() => toggleInterest(interest)}
                    key={interest.id}
                    active={selectedInterests.includes(interest)}
                    text={interest.name}
                    Icon={icons[interest.name]}
                    shadow
                  />
                ))}
              {isLoading && (
                <View className="w-full flex flex-row items-center justify-center">
                  <ActivityIndicator size="large" color="#d14d72" />
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => sendInterests()}
              disabled={isSendingLoading || isLoading || selectedInterests.length < 3}
              style={styles.cabaret_shadow}
              className={`p-2 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center ${selectedInterests.length < 3 && "bg-cabaret-400"}`}
            >
              <Text className="text-white font-bold text-base">
                {isSendingLoading ? "Saving..." : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
