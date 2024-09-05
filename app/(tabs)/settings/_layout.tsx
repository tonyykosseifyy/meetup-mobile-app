import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="account-details"
        options={{
          title: "Your Account",
          headerShown: true,
          headerLeft: (props) => (
            <TouchableOpacity onPress={router.back}>
              <MaterialIcons name="arrow-back-ios-new" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="interests"
        options={{
          title: "Your Interests",
          headerShown: true,
          headerLeft: (props) => (
            <TouchableOpacity onPress={router.back}>
              <MaterialIcons name="arrow-back-ios-new" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
