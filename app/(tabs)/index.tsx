import React from "react";
import { useState } from "react";
import { View, Image, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header, Footer, Button } from "@/components";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";

const renderItem = () => {
  
  return <View className="bg-white px-2 py-6 mb-4" style={styles.shadow}>
  <View className="flex-row items-center">
  <Image
   source={ require('@/assets/images/sample_avatar.png')}
   className="w-16 h-16  rounded-full border-solid border-2 border-cabaret-500 mx-4"
 />
 <View className="flex flex-1 gap-2 mb-4">
   <Text className="font-bold">Michelle Saliba, <Text className="text-cabaret-500">35</Text></Text>
   <Text className="text-cabaret-500 font-bold">Lawyer</Text>
   <Text className="text-slate-500 text-[12px]">Fun and adventurous. I'm not afraid to try new things and I love to be spontaneous</Text>
 </View>
 
  </View>
 <View className="flex-row flex-wrap mt-4 justify-start gap-2">
   <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-[#D9D9D9]">
   <MaterialCommunityIcons   name="charity" size={16} color="black" />
   <Text className="ml-2 text-[12px]">Charity</Text>
   </View>
   <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-slate-200">
   <MaterialCommunityIcons   name="charity" size={16} color="black" />
   <Text className="ml-2 text-[12px]">Charity</Text>
   </View>
   <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-slate-200">
   <MaterialCommunityIcons   name="charity" size={16} color="black" />
   <Text className="ml-2 text-[12px]">Charity</Text>
   </View>
   <View className="flex flex-row  items-center bg-white py-3 px-3 rounded-full  border-solid border-[1px] border-slate-200">
   <MaterialCommunityIcons   name="charity" size={16} color="black" />
   <Text className="ml-2 text-[12px]">Charity</Text>
   </View>
 </View>
 
</View>;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
    <View className="flex-1 bg-white flex">
       <View className="pt-4 pb-8">
        <LogoNavbar />
      </View>
      
      <View className="flex flex-row px-8 mb-8">
        <Button addClassName="flex-1 mr-4">For you</Button>
        <Button addClassName="flex-1 bg-white" textColor="black">Nearby</Button>
      </View>
      <FlatList
      className="mx-4"
        data={new Array(3).fill(0)}
        renderItem={renderItem}
   
      />
   
      
      
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#656566",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cabaret_shadow: {
    shadowColor: "#FFffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
});
