import React from "react";
import { Pressable, Text } from "react-native";
import { ChipProps } from "./interface.chip";

const Chip = ({ active, icon, text }: ChipProps) => {
  return (
    <Pressable className={`flex flex-row items-center justify-center rounded-full ${active ? "bg-cabaret-500" : "bg-white"}`}>
      {icon}
      <Text className={`${active ? "text-white": "text-black"}`}>{text}</Text>
    </Pressable>
  )
}

export default Chip ;