import React from "react";
import { Pressable, Text } from "react-native";
import { ChipProps } from "./interface.chip";

const Chip = ({ active, icon, text, onPress }: ChipProps) => {
  console.log(text);
  return (
    <Pressable onPress={onPress} className={`py-3 px-6 mx-1 mt-3 flex flex-row items-center justify-center rounded-full ${active ? "bg-cabaret-500" : "bg-white"}`}>
      {icon}
      <Text className={`font-bold ${active ? "text-white": "text-black"}`}>{text}</Text>
    </Pressable>
  )
}

export default Chip ;