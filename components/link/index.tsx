import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

const CustomLink = (props: any) => {
  return (
    <Link href={props.href} asChild>
      <Pressable>
        <Text>{props.children}</Text>
      </Pressable>
    </Link>
  );
}


export default CustomLink;
