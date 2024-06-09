import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getMe } from "@/api/axios/users";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, TextInput } from "react-native";
import { AntDesign, Fontisto, MaterialIcons, Feather } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "@/utils/common";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useMutation } from "react-query";
import { updateUser } from "@/api/axios/users";
import axios from "axios";
import { useQueryClient } from "react-query";
import styles from "@/constants/styles";
import { Alert } from "react-native";
import { changePassword } from "@/api/axios/users";

export default function SettingsChangePassword() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState<boolean>(false);

  // get me
  const { isLoading: isUserLoading } = useQuery({
    queryKey: "/auth/userinfo/",
    queryFn: () => getMe(),
    retry: 1,
    onSuccess: (data) => {
      setName(data.full_name);
      setEmail(data.email);
    },
  });
  const {
    mutate: editUser,
    isLoading: isUpdating,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutation({
    mutationFn: () => changePassword({ name, email, password }),
    mutationKey: "/auth/userinfo/update",
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries("/auth/userinfo/");
      Alert.alert("Change Password", "Your Password has been updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    },
  });

  return (
    <View className="flex-1 bg-white flex">
      <KeyboardAwareScrollView className="h-screen">
        <View className="px-5 mt-6">
          <View>
            <Text className="font-medium text-2xl">Change Your Password</Text>
            <Text className="mt-1 text-slate-800">
              Please enter your current password and then choose a new password.
            </Text>
          </View>

          <View className="mt-10">
            <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                secureTextEntry={!passwordVisible}
                placeholder={"Your Old Password"}
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

            <View className="mt-8">
              <TouchableOpacity
                disabled={
                  !password ||
                  !passwordConfirmation ||
                  isUpdating ||
                  password !== passwordConfirmation ||
                  isUserLoading
                }
                onPress={() => editUser()}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center"
              >
                {isUpdating ? (
                  <Text className="text-white font-bold text-base">Saving...</Text>
                ) : (
                  <Text className="text-white font-bold text-base">Change Password</Text>
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
