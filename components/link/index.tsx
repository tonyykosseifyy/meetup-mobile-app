import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { LinkProps } from "./interface.link";


const CustomLink = ({ href, className, children }: LinkProps) => {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity className={`border-b-[0.5px] border-red-500 ${className && className}`}>
        <Text className="font-sans text-xs text-cabaret-500">{children}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CustomLink;
