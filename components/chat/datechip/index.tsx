import styles from "@/constants/styles";
import React from "react";
import { View, Text } from "react-native";

interface DateChipProps {
  date: string;
}

const DateChip = ({ date }: DateChipProps) => {
  return (
    <View
      style={styles.grey_shadow}
      className="bg-transparent mx-auto bg-cabaret-100 rounded-lg px-4 py-1"
    >
      <Text className="text-cabaret-500 font-semibold text-xs">{date}</Text>
    </View>
  );
};

export default DateChip;
