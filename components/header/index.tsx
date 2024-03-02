import { View } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { FontAwesome6 } from '@expo/vector-icons';
import { HeaderProps } from "./interface.header";

const Header = (props: HeaderProps) => {
  const { leftButton, rightButton } = props;

  return (
    <View className="p-5 flex flex-row items-center justify-between">
        <View className="flex-1">
            {leftButton && (
                <FontAwesome6 name="arrow-left" size={22} color="black" />
            )}
        </View>
        <View className="flex-1">
            <LogoNavbar />
        </View>
        <View className="flex-1">
        {rightButton && (
                rightButton
            )}
        </View>
    </View>
  )
};

export default Header;
