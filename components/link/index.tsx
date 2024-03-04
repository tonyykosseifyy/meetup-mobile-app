import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";

const CustomLink = (props: any) => {
  return (
    <Link href={props.href} asChild>
      <TouchableOpacity className="border-b-[0.5px] border-red-500">
        <Text className="font-sans text-xs text-cabaret-500">{props.children}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CustomLink;
