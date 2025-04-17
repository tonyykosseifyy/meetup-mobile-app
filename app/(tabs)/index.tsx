import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IUser } from "@/interfaces";
import { Friend } from "@/components/friend";
import Meetup from "@/api/services/meetup/meetup.api";
import * as Location from "expo-location";
import Auth from "@/api/services/auth/auth.api";

export interface CardProps {
  item: IUser;
}

enum TabType {
  FOR_YOU = "For You",
  NEARBY = "Nearby",
}

const renderItem = ({ item }: CardProps) => {
  if (item.user_info) {
    return <Friend item={item} />;
  } else {
    return <></>;
  }
};

export default function Home() {
  const meetupApi = Meetup.getInstance();
  const authApi = Auth.getInstance();

  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<TabType>(TabType.FOR_YOU);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // const [selectedLanguage, setSelectedLanguage] = useState();

  // fetch user info
  // const { data: userInfo } = useQuery({
  //   queryKey: "getMe",
  //   queryFn: () => authApi.getMe(),
  //   onSettled: (data) => {
  //     console.log("User info fetched successfully", data);
  //   }
  // });

  const { mutate: submitLocationInfo } = useMutation({
    mutationFn: ({ loc_lat, loc_lon }: { loc_lat: number; loc_lon: number }) =>
      authApi.updateUserInfo({
        loc_lat: loc_lat,
        loc_lon: loc_lon,
      }),
    mutationKey: "/auth/userinfo/update",
    onSuccess: () => {
      queryClient.invalidateQueries("getMe");
    },
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
      submitLocationInfo({
        loc_lat: userLocation.coords.latitude,
        loc_lon: userLocation.coords.longitude,
      });
    })();
  }, []);

  const fetchUsers = useCallback(async () => {
    switch (activeTab) {
      case TabType.FOR_YOU:
        return meetupApi.getForYouLookup();
      case TabType.NEARBY:
        return meetupApi.getNearbyLookup();
      default:
        return [];
    }
  }, [activeTab, meetupApi]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["/meetup/users/", activeTab],
    queryFn: fetchUsers,
    onSuccess: (data) => {
      // console.log("Data fetched successfully", data);
    },
  });

  const [indicatorPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate the indicator position when the active tab changes
    Animated.spring(indicatorPosition, {
      toValue: activeTab === TabType.FOR_YOU ? 0 : 1,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const tabWidth = 120;
  const indicatorTranslateX = indicatorPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabWidth], // Move the indicator bar based on tab width
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1">
        <View className="pt-1 pb-3">
          <View className="flex flex-row items-center justify-center w-full">
            <View>
              <Image
                className="h-5"
                source={require("@/assets/images/full_logo3.png")}
                alt="Logo Full"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View className="relative flex flex-row w-60 mx-auto mb-2">
          <TouchableOpacity
            onPress={() => setActiveTab(TabType.FOR_YOU)}
            className={`flex-1 items-center p-2`}
          >
            <Text
              className={`${activeTab === TabType.FOR_YOU ? "text-cabaret-500 font-bold" : "text-slate-700 font-medium"}`}
            >
              For You
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab(TabType.NEARBY)}
            className={`flex-1 items-center p-2`}
          >
            <Text
              className={`font-medium ${activeTab === TabType.NEARBY ? "text-cabaret-500 font-bold" : "text-slate-700 font-medium"}`}
            >
              Nearby
            </Text>
          </TouchableOpacity>
          <Animated.View
            className="absolute bottom-[1px] h-[1.6px] bg-cabaret-500 rounded-full ml-[42px]"
            style={{ width: "13%", transform: [{ translateX: indicatorTranslateX }] }}
          />
        </View>

        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#d14d72" />
          </View>
        )}
        
        {data && data.length > 0 && (
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.email} />
        )}
        {data?.length === 0 && !isLoading && (
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
        )}
      </View>
    </SafeAreaView>
  );
}

