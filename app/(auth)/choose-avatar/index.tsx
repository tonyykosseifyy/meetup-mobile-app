import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Header } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import Auth from "@/api/auth.api";
import { Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import styles from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { API_URL } from "@/api/utils/abstract-api";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ChooseAvatar() {
  const authApi = Auth.getInstance();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  // Mutation for updating user info
  const { mutate: editUser, isLoading: isUpdating } = useMutation({
    mutationFn: () => authApi.updateUserInfo({ avatar_id: selectedAvatar }),
    mutationKey: "/auth/userinfo/update",
    onSuccess: (data) => {
      Alert.alert("Profile Avatar", "Profile Avatar updated successfully", [
        {
          text: "OK",
          onPress: () => {
            queryClient.invalidateQueries("getMe");
            while (router.canGoBack()) {
              router.back();
            }
            router.replace("/(tabs)");
          },
        },
      ]);
    },
    onError: (error) => {
      console.log("Error updating user info: ", error);
      Alert.alert("Profile Avatar", "An error occurred while updating your profile avatar.", [
        {
          text: "OK",
          onPress: () => {
            queryClient.invalidateQueries("getMe");
            while (router.canGoBack()) {
              router.back();
            }
            router.replace("/(tabs)");
          },
        },
      ]);
    },
  });

  const {
    data: avatars,
    isLoading: isLoadingAvatars,
    isError: isErrorAvatars,
  } = useQuery({
    queryKey: "getAvatars",
    queryFn: () => authApi.getAllAvatars(),
  });

  // Handle loading state
  if (isLoadingAvatars) {
    return (
      <View className="flex-1 bg-white flex items-center justify-center">
        <ActivityIndicator size="large" color="#d14d72" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView>
        <View className="flex-1 bg-white flex">
          <Header
            // leftButton
            theme={"light"}
          />
          <View className="px-5 flex-1">
            <View className="mt-7">
              <Text className="text-black font-medium text-2xl">Your Avatar</Text>
              <Text className="text-slate-700 mt-1 leading-5">
                Choose an avatar that represents you best!
              </Text>
            </View>

            {!isUpdating && Array.isArray(avatars) && (
              <View className="mt-7 flex flex-row flex-wrap justify-between">
                {avatars.map((avatar) => (
                  <TouchableOpacity
                    style={selectedAvatar === avatar.id ? styles.cabaret_shadow : {}}
                    className={`relative h-40 w-40 my-4 bg-white p-3 rounded-full ${selectedAvatar === avatar.id ? "border bg-cabaret-50 border-cabaret-400" : ""}`}
                    key={avatar.id}
                    onPress={() => setSelectedAvatar(avatar.id)}
                  >
                    <Image
                      className="w-full h-full object-contain rounded-full bg-transparent"
                      source={{ uri: `${API_URL}${avatar.image_url}` }}
                    />
                    {selectedAvatar === avatar.id && (
                      <TouchableOpacity
                        onPress={() => editUser()}
                        className="absolute bottom-0 right-0 bg-white p-1 rounded-full"
                      >
                        <Ionicons name="checkmark-circle" size={24} color="#d14d72" />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {isUpdating && (
              <View className="w-full flex-1 h-full flex flex-row items-center justify-center mt-10">
                <ActivityIndicator size="large" color="#d14d72" />
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
