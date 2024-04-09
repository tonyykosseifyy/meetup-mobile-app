import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { LinkProps } from "./interface.link";

const CustomLink = ({ href, theme, children }: LinkProps) => {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity>
        <Text
          className={`text-xs font-bold  ${theme !== "light" ? "text-cabaret-500" : "text-gray-700"}`}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CustomLink;
