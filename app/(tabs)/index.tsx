import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { LogoNavbar } from "@/components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useQuery } from "react-query";
import { IUser } from "@/interfaces";
import { Friend } from "@/components/friend";
import Auth from "@/api/auth.api";
import { Image } from "react-native";

// icon library:
// https://www.iconfinder.com/icons/3099544/woman_shrugging_icon
export interface CardProps {
  item: IUser;
}

const renderItem = ({ item }: CardProps) => {
  if (item.user_info) {
    return <Friend item={item} />;
  } else {
    return <></>;
  }
};

export default function Home() {
  const authApi = Auth.getInstance();
  const { isLoading, error, data } = useQuery({
    queryKey: "/meetup/users/",
    queryFn: () => authApi.lookup(),
    onSuccess: (data) => {
      // console.log("REFETCH USERSSSSS", data);
    },
  });
  // console.log("EL DATA EL DATA", data);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1">
        <View className="pt-4 pb-4">
          <LogoNavbar />
        </View>

        <View className="flex flex-row items-center justify-center w-4/5 mx-auto mb-5 mt-2">
          <TouchableOpacity className="flex-1 bg-cabaret-500 flex flex-row justify-center p-4 relative rounded-full">
            <Text className="text-white font-bold">For You</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.grey_shadow}
            className="ml-4 flex-1 bg-white flex flex-row justify-center p-4 relative rounded-full"
          >
            <Text className="text-black font-bold">Nearby</Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#d14d72" />
          </View>
        )}
        {/* {data && data?.length >= 1 && (
          <FlatList
            data={data} // Assuming the fetched data is an object with a 'users' array
            renderItem={renderItem}
            keyExtractor={(item) => item.email}
          />
        )} */}
        {/* data?.length == 0 && !isLoading */}
        {
          <View className="flex-1 justify-center items-center">
            <Image
              source={require("@/assets/images/no-user-found.png")}
              className="w-32 h-32 mb-5"
            />
            <Text className="text-cabaret-950 text-base text-center">Oops! No Users Found</Text>
            <Text className="text-slate-600 mt-2 text-center text-sm w-[80%]">
              Give it another shot or check back soon—we’re always updating!
            </Text>
          </View>
        }
      </View>
    </SafeAreaView>
  );
}
