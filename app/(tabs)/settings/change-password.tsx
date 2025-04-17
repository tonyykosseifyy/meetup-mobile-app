import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, TextInput } from "react-native";
import { AntDesign, Fontisto, MaterialIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import styles from "@/constants/styles";
import { Alert } from "react-native";
import Auth from "@/api/services/auth/auth.api";

export default function SettingsChangePassword() {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState<boolean>(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const authApi = Auth.getInstance();

  const {
    mutate: changePassword,
    isLoading: isUpdating,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      authApi.changePassword({ current_password: oldPassword, new_password: newPassword }),
    mutationKey: "/auth/userinfo/update",
    onSuccess: (data) => {
      Alert.alert("Change Password", "Your Password has been updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    },
  });

  const isDisabled = useMemo(
    () => !oldPassword || !newPassword || isUpdating,
    [oldPassword, newPassword, isUpdating]
  );

  return (
    <View className="flex-1 bg-white flex">
      <View className="h-screen">
        <View className="flex-1 px-5 mt-6 flex flex-col justify-between pb-48">
          {/* Top Part */}
          <View>
            <View>
              <Text className="font-medium text-2xl">Change Your Password</Text>
              <Text className="mt-1 text-slate-700">
                Please enter your current password and then choose a new password.
              </Text>
            </View>

            <View className="mt-10">
              <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
                <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
                <TextInput
                  secureTextEntry={!oldPasswordVisible}
                  placeholder={"Your Old Password"}
                  className="flex-1 h-6 ml-3"
                  placeholderTextColor={"#666666"}
                  onChangeText={setOldPassword}
                  value={oldPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setOldPasswordVisible(!oldPasswordVisible)}>
                  <Feather
                    name={oldPasswordVisible ? "eye-off" : "eye"}
                    size={19}
                    color="black"
                    style={{ opacity: 0.5 }}
                  />
                </TouchableOpacity>
              </View>

              <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
                <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
                <TextInput
                  secureTextEntry={!newPasswordVisible}
                  placeholder={"New password"}
                  className="flex-1 h-6 ml-3"
                  placeholderTextColor={"#666666"}
                  onChangeText={setNewPassword}
                  value={newPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
                  <Feather
                    name={newPasswordVisible ? "eye-off" : "eye"}
                    size={19}
                    color="black"
                    style={{ opacity: 0.5 }}
                  />
                </TouchableOpacity>
              </View>

              {isUpdatingError && (
                <View className="mt-8 bg-red-50 p-4 border border-red-500 rounded-lg flex flex-row items-center space-x-2">
                  <MaterialIcons name="error-outline" size={20} color="rgb(239 68 68)" />
                  <Text className="text-red-500 text-sm leading-[18px]">
                    Whoops!{" "}
                    {axios.isAxiosError(updatingError) && updatingError.response
                      ? (updatingError.response.data.message as any as string)
                      : "An error occured with registration."}{" "}
                    Please check your information and try again.
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Bottom Button */}
          <View className="">
            <TouchableOpacity
              disabled={isDisabled}
              onPress={() => changePassword({ oldPassword, newPassword })}
              style={styles.cabaret_shadow}
              className={`p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center ${isDisabled && "bg-cabaret-400"}`}
            >
              {isUpdating ? (
                <Text className="text-white font-bold text-base">Saving...</Text>
              ) : (
                <Text className="text-white font-bold text-base">Change Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
