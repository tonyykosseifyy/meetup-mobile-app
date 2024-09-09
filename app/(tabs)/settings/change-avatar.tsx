import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation, useQueryClient } from "react-query";
import Auth from "@/api/auth.api";
import axios from "axios";
import styles from "@/constants/styles";
import { ImageSourcePropType, Animated } from "react-native";
import { FlatList } from "react-native";

const avatarImages: Record<number, ImageSourcePropType> = {
  1: require("@/assets/avatars/avatar1.png"),
  2: require("@/assets/avatars/avatar2.png"),
  3: require("@/assets/avatars/avatar3.png"),
  // 4: require("@/assets/avatars/avatar4.png"),
  // 5: require("@/assets/avatars/avatar5.png"),
  // 6: require("@/assets/avatars/avatar6.png"),
  // 7: require("@/assets/avatars/avatar7.png"),
  // 8: require("@/assets/avatars/avatar8.png"),
  // 9: require("@/assets/avatars/avatar9.png"),
  // 10: require("@/assets/avatars/avatar10.png"),
  // Add more avatars here if needed
};

// Helper function to handle double-tap
const useDoubleTap = (onDoubleTap: { (): void; (): void }) => {
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    setTapCount((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (tapCount === 2) {
      onDoubleTap();
      setTapCount(0); // Reset tap count after double-tap
    }
  }, [tapCount]);

  return handleTap;
};

export default function ProfileAvatar() {
  const authApi = Auth.getInstance();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  // Double-tap handler
  const handleDoubleTap = (avatar: React.SetStateAction<number | null>) => {
    setSelectedAvatar(avatar);
  };

  // Mutation for updating user info
  const {
    mutate: editUser,
    isLoading: isUpdating,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutation({
    mutationFn: () => authApi.updateUserInfo({ avatar: selectedAvatar }),
    mutationKey: "/auth/userinfo/update",
    retry: false,
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
  });

  // Fetch user info
  const { data: userInfo, isFetching } = useQuery({
    queryKey: "getMe",
    queryFn: () => authApi.getMe(),
    retry: 1,
  });

  // Handle loading state
  if (isFetching) {
    return (
      <View className="flex-1 bg-white flex items-center justify-center">
        <ActivityIndicator size="large" color="#d14d72" />
      </View>
    );
  }

  // Handle avatar selection and update
  const handleAvatarSelect = (avatar: React.SetStateAction<number | null>) => {
    useDoubleTap(() => handleDoubleTap(avatar));
  };

  return (
    <View className="flex-1 bg-white flex">
      <KeyboardAwareScrollView className="h-screen">
        <View className="px-5 mt-6">
          <View>
            <Text className="font-medium text-2xl">Profile Avatar</Text>
            <Text className="mt-1 text-slate-700">Choose an avatar that represents you best!</Text>
          </View>

          <View className="mt-4 flex flex-row flex-wrap justify-evenly" >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((avatar) => (
              <TouchableOpacity
                style={selectedAvatar === avatar ? styles.cabaret_shadow : {}}
                className={`h-24 w-24 bg-white p-3 rounded-full ${selectedAvatar === avatar ? "border bg-cabaret-50 border-cabaret-400" : ""}`}
                key={avatar}
                onPress={() => setSelectedAvatar(avatar)}
              >
                <Image
                  className="w-full h-full object-contain rounded-full bg-transparent"
                  source={avatarImages[avatar]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View className="mt-10">
            {isUpdatingError && (
              <View className="mt-4">
                <Text className="text-red-500 font-bold">
                  Whoops!{" "}
                  {axios.isAxiosError(updatingError) && updatingError.response
                    ? (updatingError.response.data.message as any as string)
                    : "An error occurred with registration."}{" "}
                  Please try again.
                </Text>
              </View>
            )}

            <View className="mt-8">
              <TouchableOpacity
                onPress={() => editUser()}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center"
              >
                {isUpdating ? (
                  <Text className="text-white font-bold text-base">Saving...</Text>
                ) : (
                  <Text className="text-white font-bold text-base">Set Avatar</Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="mt-20" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
