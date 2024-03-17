import React from "react";
import { FooterProps } from "./interface.footer";
import { View, Text } from "react-native";
import { Link } from "@/components";

const Footer = (props: FooterProps) => {
  const { theme } = props;
  return (
    <View className="mt-12 flex">
      <Text className="font-sans font-light text-base text-gray-700">Don’t have an account?</Text>
      <View className="mt-3 flex flex-row items-baseline justify-between w-full">
        <Link theme={theme} href="/signup/mom">
          Register Myself
        </Link>
        <Link theme={theme} href="/signup-otp">
          Register Mom
        </Link>
      </View>
    </View>
  );
};

export default Footer;
