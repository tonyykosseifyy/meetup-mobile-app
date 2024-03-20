import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "@/components";
import Chip from "@/components/chip";
import styles from "@/constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { interests, icons } from "./data";
import { useQuery } from "react-query";


const Skip = (): React.JSX.Element => (
  <TouchableOpacity>
    <Text className="text-cabaret-500 font-bold">Skip</Text>
  </TouchableOpacity>
);

export default function SignUpOtp() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // fetch user interests
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "/meetup/interests/",
    queryFn: () => fetchInterests(),
  });
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <Header leftButton theme={"light"} rightButton={Skip()} />
        <View className="px-5 flex-1">
          <View className="mt-7">
            <Text className="text-black font-medium text-2xl">Select up to 3 interest</Text>
            <Text className="text-slate-800 mt-1 leading-5">
              Tell us about your interests and what excite you
            </Text>
          </View>

          <View className="mt-20 flex-1 w-full justify-between pb-28">
            <View className="flex flex-row justify-center flex-wrap h-64 w-full">
              {interests.map((interest) => (
                <Chip
                  onPress={() => toggleInterest(interest)}
                  key={interest}
                  active={selectedInterests.includes(interest)}
                  text={interest}
                  Icon={icons[interest]}
                  shadow
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.cabaret_shadow}
              className="p-2 bg-cabaret-500 h-[60px] rounded-full flex flex-row items-center justify-center"
            >
              <Text className="text-white font-bold text-base">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
