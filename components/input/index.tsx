import { TextInput } from "react-native";

export const Input = (props: any) => {
  return <TextInput placeholderTextColor={"#9A9A9A"} className="border-solid border-gray-100 p-4 border-2  rounded-xl mt-1" {...props} />;
};