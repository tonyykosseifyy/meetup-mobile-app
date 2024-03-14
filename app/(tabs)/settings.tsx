import { Button } from "@/components";
import React from "react";
import { View, Text, Image } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6.js';

export default function Tab() {
  return (
    <View className="flex-1 bg-white">
        <Image
   source={ require('@/assets/images/sample_avatar.png')}
   className="w-32 h-32 mx-auto mt-8 mb-2 self-center  rounded-full border-solid border-2 border-cabaret-500 mx-4"
 />
 <Text className="text-center font-bold text-lg">Michelle Saliba</Text>
 <View className="mx-4">
 <Text className="text-lg mb-4">General</Text>
 <Button addClassName="bg-[#F2F2F2] justify-start mb-4" textColor="black" disableShadow> <FontAwesome6 size={18} name="bell" color={"gray"} />Notifications</Button>
 <Button addClassName="bg-[#F2F2F2] justify-start" textColor="black" disableShadow>Notifications</Button>
 </View>
    </View>
  );
}
