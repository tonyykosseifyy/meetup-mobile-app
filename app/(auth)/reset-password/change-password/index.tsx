import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, TextInput } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import styles from "@/constants/styles";
import { Alert } from "react-native";
import { useAuth } from "@/providers/auth.provider";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components";
import Auth from "@/api/services/auth.api";

export default function SettingsChangePassword() {
  const { resetPasswordInfo } = useAuth();
  const authApi = Auth.getInstance();

  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState<boolean>(false);

  const {
    mutate: mutateResetPassword,
    isLoading: isUpdating,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutation({
    mutationFn: () =>
      authApi.resetPassword({
        email: resetPasswordInfo ? resetPasswordInfo.email : "",
        code: resetPasswordInfo ? resetPasswordInfo.code : "",
        password,
      }),
    mutationKey: "/auth/userinfo/reset-password",
    onSuccess: (data) => {
      Alert.alert(
        "Reset Password",
        "Your Password has been updated successfully. You will be redirected to login using your new password.",
        [
          {
            text: "OK",
            onPress: () => {
              while (router.canGoBack()) {
                router.back();
              }
              router.replace("/(auth)/login");
            },
          },
        ]
      );
    },
  });

  const isDisabled = useMemo(
    () => !password || !passwordConfirmation || isUpdating || password !== passwordConfirmation,
    [password, passwordConfirmation, isUpdating]
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <KeyboardAwareScrollView className="h-screen">
          <Header leftButton theme={"light"} />
          <View className="px-5 mt-6">
            <View>
              <Text className="font-medium text-2xl">Finally! Your New Password</Text>
              <Text className="mt-1 text-slate-700">
                Enter your new password below. Make sure it is strong and secure
              </Text>
            </View>

            <View className="mt-10">
              <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
                <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
                <TextInput
                  secureTextEntry={!passwordVisible}
                  placeholder={"Your New Password"}
                  className="flex-1 h-6 ml-3"
                  placeholderTextColor={"#666666"}
                  onChangeText={setPassword}
                  value={password}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Feather
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={19}
                    color="black"
                    style={{ opacity: 0.5 }}
                  />
                </TouchableOpacity>
              </View>

              <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
                <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
                <TextInput
                  secureTextEntry={!passwordConfirmationVisible}
                  placeholder={"Confirm password"}
                  className="flex-1 h-6 ml-3"
                  placeholderTextColor={"#666666"}
                  onChangeText={setPasswordConfirmation}
                  value={passwordConfirmation}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setPasswordConfirmationVisible(!passwordConfirmationVisible)}
                >
                  <Feather
                    name={passwordConfirmationVisible ? "eye-off" : "eye"}
                    size={19}
                    color="black"
                    style={{ opacity: 0.5 }}
                  />
                </TouchableOpacity>
              </View>

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

              <View className="mt-28">
                <TouchableOpacity
                  disabled={isDisabled}
                  onPress={() => mutateResetPassword()}
                  style={styles.cabaret_shadow}
                  className={`p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center ${isDisabled && "bg-cabaret-400"}`}
                >
                  {isUpdating ? (
                    <Text className="text-white font-bold text-base">Saving...</Text>
                  ) : (
                    <Text className="text-white font-bold text-base">Reset Password</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View className="mt-20" />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
