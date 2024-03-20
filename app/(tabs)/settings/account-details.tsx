import { Button } from "@/components";
import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import data from "@/assets/data/registration_data";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Registration from "@/components/registration";
import { useQuery } from "react-query";
import { getMe } from "@/api/axios/users";

export default function AccountDetails() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // get user info and populate the form
  const { data: userInfo } = useQuery("me", getMe);

  useEffect(() => {
    const parentNavigation = navigation.getParent();

    if (isFocused) {
      // Customize the tab bar when the screen is focused
      if (parentNavigation) {
        parentNavigation.setOptions({
          headerRight: () => (
            <Button
              addClassName="bg-transparent w-auto p-0 mr-4"
              textColor="cabaret-500"
              disableShadow
            >
              Confirm
            </Button>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.goBack} className="ml-4">
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        });
      }
    }
    return () => {
      if (parentNavigation) {
        parentNavigation.setOptions({
          headerRight: () => <View />,
          headerLeft: () => <View />,
        });
      }
    };
  }, [isFocused, navigation]);
  if (userInfo) {
    return <Registration settings data={data.edit} userInfo={userInfo.data} />;
  }
  return <Registration settings data={data.edit} />;
}
