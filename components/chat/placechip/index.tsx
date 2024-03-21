import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "@/constants/styles";
import CheckIcon from "@/assets/icons/chat/check.svg";

interface PlaceChipProps {
  active?: boolean;
  title: string;
  onPress: () => void;
}

const PlaceChip = ({ active, title, onPress }: PlaceChipProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.grey_shadow}
      className={`flex flex-row items-center py-2 px-5 mr-3 rounded-xl ${active ? "bg-cabaret-500" : "bg-[#F5F3F3]"}`}
    >
      {active && <CheckIcon className="mr-1" width={17} />}
      <Text className={`font-light ${active ? "text-white" : "text-black"}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PlaceChip;
