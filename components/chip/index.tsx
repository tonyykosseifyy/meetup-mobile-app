import React from "react";
import { Pressable, Text } from "react-native";
import { ChipProps } from "./interface.chip";
import styles from "@/constants/styles";

const Chip = ({
  active,
  Icon,
  text,
  onPress,
  pressableClassName,
  textClassName,
  shadow,
}: ChipProps) => {
  return (
    <Pressable
      style={shadow && styles.grey_shadow}
      onPress={onPress}
      className={`flex flex-row items-center justify-center rounded-full py-3 px-5 mx-1 mt-3 bg-${active ? "cabaret-500" : "white"} ${pressableClassName}`}
    >
      {active ? <Icon fill="white" /> : <Icon fill="#d14d72" />}
      <Text className={`text-${active ? "white" : "black"} text-xs ml-2 ${textClassName}`}>
        {text}
      </Text>
    </Pressable>
  );
};

export default Chip;
