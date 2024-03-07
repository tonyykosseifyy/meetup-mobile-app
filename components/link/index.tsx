import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { LinkProps } from "./interface.link";

const CustomLink = ({ href, theme, children }: LinkProps) => {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity
        className={`border-b-[0.5px] ${theme !== "light" ? "border-red-500" : "border-gray-700"}`}
      >
        <Text
          className={`font-sans text-sm ${theme !== "light" ? "text-cabaret-500" : "text-gray-700"}`}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CustomLink;
