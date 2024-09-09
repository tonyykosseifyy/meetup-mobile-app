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
import { AntDesign } from "@expo/vector-icons";

const avatarImages: Record<number, ImageSourcePropType> = {
  1: require("@/assets/avatars/avatar1.png"),
  2: require("@/assets/avatars/avatar2.png"),
  3: require("@/assets/avatars/avatar3.png"),
  4: require("@/assets/avatars/avatar4.png"),
  5: require("@/assets/avatars/avatar5.png"),
  6: require("@/assets/avatars/avatar6.png"),
  7: require("@/assets/avatars/avatar7.png"),
  8: require("@/assets/avatars/avatar8.png"),
  9: require("@/assets/avatars/avatar9.png"),
  10: require("@/assets/avatars/avatar10.png"),
  11: require("@/assets/avatars/avatar11.png"),
  12: require("@/assets/avatars/avatar12.png"),
  13: require("@/assets/avatars/avatar13.png"),
  14: require("@/assets/avatars/avatar14.png"),
  15: require("@/assets/avatars/avatar15.png"),
  16: require("@/assets/avatars/avatar16.png"),
  17: require("@/assets/avatars/avatar17.png"),
  18: require("@/assets/avatars/avatar18.png"),
  19: require("@/assets/avatars/avatar19.png"),
  20: require("@/assets/avatars/avatar20.png"),
  21: require("@/assets/avatars/avatar21.png"),
  22: require("@/assets/avatars/avatar22.png"),
  23: require("@/assets/avatars/avatar23.png"),
  24: require("@/assets/avatars/avatar24.png"),
  25: require("@/assets/avatars/avatar25.png"),
  26: require("@/assets/avatars/avatar26.png"),
  27: require("@/assets/avatars/avatar27.png"),
  28: require("@/assets/avatars/avatar28.png"),
  29: require("@/assets/avatars/avatar29.png"),
  30: require("@/assets/avatars/avatar30.png"),
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
  return (
    <View className="flex-1 bg-white flex">
      <KeyboardAwareScrollView className="h-screen">
        <View className="px-5 mt-6 flex flex-col">
          <View>
            <Text className="font-medium text-2xl">Profile Avatar</Text>
            <Text className="mt-1 text-slate-700">Choose an avatar that represents you best!</Text>
          </View>

          {!isUpdating && (
            <View className="mt-7 flex flex-row flex-wrap justify-between">
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                24, 25, 26, 27, 28, 29, 30,
              ].map((avatar) => (
                <TouchableOpacity
                  style={selectedAvatar === avatar ? styles.cabaret_shadow : {}}
                  className={`relative h-40 w-40 my-4 bg-white p-3 rounded-full ${selectedAvatar === avatar ? "border bg-cabaret-50 border-cabaret-400" : ""}`}
                  key={avatar}
                  onPress={() => setSelectedAvatar(avatar)}
                >
                  <Image
                    className="w-full h-full object-contain rounded-full bg-transparent"
                    source={avatarImages[avatar]}
                  />
                  {selectedAvatar === avatar && (
                    <TouchableOpacity
                      onPress={() => editUser()}
                      className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full"
                    >
                      <AntDesign name="pluscircle" size={20} color="#d14d72" />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          {isUpdating && (
            <View className="flex flex-1 h-full items-center justify-center mt-10">
              <ActivityIndicator size="large" color="#d14d72" />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
