import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, TextInput } from "react-native";
import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "@/utils/common";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
import styles from "@/constants/styles";
import { Alert } from "react-native";
import Auth from "@/api/auth.api";
import { Image } from "react-native";

export default function AccountDetails() {
  const authApi = Auth.getInstance();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const {
    mutate: editUser,
    isLoading: isUpdating,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutation({
    mutationFn: () => authApi.updateUserInfo({}),
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

  // get user info and populate the form
  const { data: userInfo, isFetching } = useQuery({
    queryKey: "getMe",
    queryFn: () => authApi.getMe(),
    retry: 1,
    onSuccess: (data) => {},
  });
  // changed this line remove && !email
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
        <View className="px-5 mt-6">
          <View>
            <Text className="font-medium text-2xl">Profile Avatar</Text>
            <Text className="mt-1 text-slate-700">Choose an avatar that represents you best!</Text>
          </View>

          <View className="">
            {[1, 2, 3].map((avatar) => (
              <TouchableOpacity onPress={() => {}} key={avatar} className="mt-4">
                <Image
                  // source={require(`../../assets/avatars/avatar-1.png`)}
                  source={require("@/assets/avatars/adjusted_avatar_1.png")}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
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
                    : "An error occured with registration."}{" "}
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
