import React, { useEffect, useRef } from "react";
import { Pressable, Text, Animated } from "react-native";
import { ChipProps } from "./interface.chip";
import styles from "@/constants/styles";

const Chip = ({ active, icon, text, onPress }: ChipProps) => {
  return (
    <Pressable
      style={styles.grey_shadow}
      onPress={onPress}
      className={`flex flex-row items-center justify-center rounded-full py-3 px-6 mx-1 mt-3 bg-${active ? "cabaret-500" : "white"}`}
    >
      {icon}
      <Text className={`text-${active ? "white" : "black"} text-xs`}>{text}</Text>
    </Pressable>
  );
};

export default Chip;
