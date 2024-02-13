import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";

const CustomLink = (props: any) => {
  return (
    <Link href={props.href} asChild>
      <TouchableOpacity>
        <Text className="font-sans text-xs text-cabaret-500 underline underline-offset-8">{props.children}</Text>
      </TouchableOpacity>
    </Link>
  );
};


export default CustomLink;
