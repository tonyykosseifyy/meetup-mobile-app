import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import CloseIcon from "@/assets/icons/chat/close.svg";
import CheckIcon from "@/assets/icons/chat/check.svg";

interface ChatButtonProps {
  positive: boolean;
  decline?: boolean;
  isLastMe?: boolean;
  onPress: () => void;
}

const ChatButton = ({ positive, onPress, decline, isLastMe }: ChatButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-row items-center py-2 pl-4 pr-6 ${positive ? "bg-cabaret-500 rounded-l-xl rounded-br-xl" : "bg-[#F5F3F3] rounded-r-xl rounded-bl-xl"}`}
    >
      {positive ? <CheckIcon /> : isLastMe ? <View /> : <CloseIcon />}
      <Text className={`font-bold ml-1 ${positive ? "text-white" : ""}`}>
        {positive ? "Agree" : decline ? "Decline" : "Request Place-Time"}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatButton;
