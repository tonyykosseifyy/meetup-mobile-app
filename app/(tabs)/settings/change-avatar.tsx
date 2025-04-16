import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation, useQueryClient } from "react-query";
import Auth from "@/api/services/auth.api";
import styles from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { API_URL } from "@/api/services/abstract/abstract-api";

export default function ProfileAvatar() {
  const authApi = Auth.getInstance();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  // Mutation for updating user info
  const {
    mutate: editUser,
    isLoading: isUpdating,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutation({
    mutationFn: () => authApi.updateUserInfo({ avatar_id: selectedAvatar }),
    mutationKey: "/auth/userinfo/update",
    onSuccess: (data) => {
      Alert.alert("Profile Avatar", "Profile Avatar updated successfully", [
        {
          text: "OK",
          onPress: () => {
            queryClient.invalidateQueries("getMe");
            navigation.goBack();
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
            navigation.goBack();
          },
        },
      ]);
    },
  });

  // Fetch user info
  const { data: userInfo, isLoading: isLoadingUserInfo, isFetching } = useQuery({
    queryKey: "getMe",
    queryFn: () => authApi.getMe(),
    onSettled: (data) => {
      if (data?.avatar) {
        console.log("selected avatar: ", data.avatar.id);
        setSelectedAvatar(data.avatar.id);
      }
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
  if (isLoadingUserInfo || isLoadingAvatars || isFetching) {
    return (
      <View className="flex-1 bg-white flex items-center justify-center">
        <ActivityIndicator size="large" color="#d14d72" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white flex">
      <KeyboardAwareScrollView className="h-screen">
        <View className="px-5 mt-6 flex flex-col">
          <View>
            <Text className="font-medium text-2xl">Profile Avatar</Text>
            <Text className="mt-1 text-slate-700">Choose an avatar that represents you best!</Text>
          </View>

          {!isUpdating && !isLoadingUserInfo && !isFetching && Array.isArray(avatars) && (
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
            <View className="opacity-100 bg-white w-full items-center justify-center mt-10">
              <ActivityIndicator size="large" color="#d14d72" />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
