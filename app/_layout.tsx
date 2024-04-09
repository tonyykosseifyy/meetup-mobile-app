import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import React, { useState } from "react";
import { AuthProvider } from "@/api/mutations/auth/AuthProvider";
// import { DevToolsBubble } from "react-native-react-query-devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { getMe } from "@/api/axios/users";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);
  const getAuthenticated = async () => {
    const data = await getMe();
    return data;
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loading]);

  if (!loaded || loading) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" hidden={false} />
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}></Stack>
        </AuthProvider>
      </GestureHandlerRootView>
      {/* <DevToolsBubble /> */}
    </QueryClientProvider>
  );
}
