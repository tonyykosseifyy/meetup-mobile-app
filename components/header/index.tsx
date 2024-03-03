import { Pressable, TouchableOpacity, View, Text } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { FontAwesome6 } from "@expo/vector-icons";
import { HeaderProps } from "./interface.header";
import { router } from "expo-router";
import { Button } from "../button";

const Header = (props: HeaderProps) => {
  const { leftButton, rightButton } = props;
  const onPress = () => {
    console.log("backkk");
    router.back();
  };

  return (
    <View className="p-5 flex flex-row items-center justify-between">
      <View className="flex-1 ">
        <TouchableOpacity onPress={onPress}>
          <FontAwesome6 name="arrow-left" size={22} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <LogoNavbar />
      </View>
      <View className="flex-1">{rightButton && rightButton}</View>
    </View>
  );
};

export default Header;
