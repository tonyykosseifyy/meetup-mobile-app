import React from "react";
import { FooterProps } from "./interface.footer";
import { View, Text } from "react-native";
import { Link } from "@/components";

const Footer = (props: FooterProps) => {
  const { theme } = props;
  return (
    <View className="mt-5 flex flex-row justify-center w-full">
      <View className="flex-row items-center w-full  text-xs text-gray-600">
        <Text>Don’t have an account yet? </Text>
        <Link theme={theme} href="/signup/">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default Footer;
