import { Pressable, Text, View } from "react-native";


const Button = (props: any) => {
  return (
    <Pressable
      className={`bg-cabaret-500 flex flex-row items-center justify-center p-3 shadow-lg ${props.rounded ? 'rounded-lg' : 'rounded-xl'}`}
      {...props}
    >
    <View className={`border-radius: 50; backgroundColor: beige; h-4 w-4 flex flex-row items-center justify-center ${props.rounded ? 'flex' : 'none'}`}>
        {/* <Icon /> */}
    </View>
    <Text className="text-white font-sans font-bold">Continue</Text>
    </Pressable>
  );
};



export { Button };
