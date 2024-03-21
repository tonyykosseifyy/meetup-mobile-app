import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatTime } from "@/utils/common";

enum Sender {
  Me = "me",
  Her = "her",
}

interface MessageProps {
  message: string;
  sender: Sender;
  date: Date;
}

const Message = ({ message, sender, date }: MessageProps) => {
  return (
    <View
      style={sender === Sender.Me ? styles.me_shadow : styles.her_shadow}
      className={`min-w-[45%] my-2 pt-3 pb-2 pl-4 ${sender === Sender.Me ? "bg-cabaret-500 rounded-l-xl rounded-br-xl" : "bg-[#F5F3F3] rounded-r-xl rounded-bl-xl self-start"}`}
    >
      <Text className={`pr-7 ${sender === Sender.Me ? "text-white" : ""}`}>{message}</Text>
      <Text className={`ml-auto mr-2 text-[10px] mt-1 ${sender === Sender.Me ? "text-white" : ""}`}>
        {formatTime(date)}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  me_shadow: {
    shadowColor: "#FF3366",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  her_shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});
