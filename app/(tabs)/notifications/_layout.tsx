import { Stack } from "expo-router/stack";
import React from "react";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "My Requests" }} />
    </Stack>
  );
}
