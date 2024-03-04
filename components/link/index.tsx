import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { LinkProps } from "./interface.link";

const CustomLink = ({ href, light, children }: LinkProps) => {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity className={`border-b-[0.5px] ${light ? "border-red-500": "border-white"}`}>
        <Text className={`font-sans text-xs ${light ? "text-cabaret-500" : "text-white"}`}>{children}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CustomLink;
