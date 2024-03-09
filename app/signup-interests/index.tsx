import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "@/components";
import styles from "@/constants/styles";
import CustomLink from "@/components/link";
import Chip from "@/components/chip";
import { ScrollView } from "react-native";

const Skip = (): React.JSX.Element => (
  <TouchableOpacity>
    <Text className="text-cabaret-500 font-bold">Skip</Text>
  </TouchableOpacity>
);

export default function SignUpOtp() {
  const interests = [
    "Technology",
    "Design",
    "Business",
    "Entertainment",
    "Education",
    "Health",
    "Science",
    "Politics",
  ];
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  }

  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton theme={"light"} rightButton={Skip()} />
      <View className="px-5">
        <View className="mt-7">
          <Text className="text-black font-medium text-2xl">Select up to 3 interest</Text>
          <Text className="text-slate-800 mt-1 leading-5">
            Tell us about your interests and what excite you
          </Text>
        </View>

        <View className="mt-20 bg-black flex-1 w-full">
          <View className="flex flex-row justify-center flex-wrap bg-black h-64 w-full">
            {interests.map((interest) => (
              <Chip onPress={() => toggleInterest(interest)} key={interest} active={selectedInterests.includes(interest)} text={interest} icon={<View />} />
             ))} 
          </View>
          {/* Continue button and other components */}
        </View>
      </View>
    </View>
  );
}
