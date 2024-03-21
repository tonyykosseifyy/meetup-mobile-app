import React from "react";
import { TouchableOpacity, View } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { FontAwesome6 } from "@expo/vector-icons";
import { HeaderProps } from "./interface.header";
import { router } from "expo-router";

const Header = (props: HeaderProps) => {
  const { leftButton, rightButton, theme } = props;

  return (
    <View className="p-5 flex flex-row-reverse items-center justify-between">
      <TouchableOpacity className="flex-1 flex flex-row justify-end ">
        {rightButton && rightButton}
      </TouchableOpacity>
      <View className="flex-1">
        <LogoNavbar />
      </View>
      <View className="flex-1">
        {leftButton && (
          <TouchableOpacity className="" onPress={() => router.back()}>
            <FontAwesome6
              name="arrow-left"
              size={22}
              color={theme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
