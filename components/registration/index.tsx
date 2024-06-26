import React, { useMemo, useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { IRegistrationData } from "@/assets/data/registration_data";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { router } from "expo-router";
import { register, setUserInfo } from "@/api/axios/auth";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Fontisto, Feather, MaterialIcons } from "@expo/vector-icons";
import { formatDate } from "@/utils/common";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import Header from "../header";
import { useAuth } from "@/api/mutations/auth/AuthProvider";
// import { CheckBox } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioGroup from "react-native-radio-buttons-group";

interface RegistrationProps {
  data: IRegistrationData;
}
// are you creating this account on behalf of yourself or on behalf of your mom/grandmother

export default function Registration({ data }: RegistrationProps) {
  const queryClient = useQueryClient();
  const { updateContextUser } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [dateChanged, setDateChanged] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [date, setDate] = useState(null);
  // useMutation((userInfo) => setUserInfo(userInfo))
  const {
    mutate: setUserInfoAfterRegister,
    isLoading: isUpdatingUserInfo,
    isError: isUpdatingUserInfoError,
    error: updatingUserInfoError,
  } = useMutation({
    mutationFn: () =>
      setUserInfo({
        email,
        password,
        full_name: fullName,
        date_of_birth: date?.toISOString().slice(0, 10),
        occupation,
        biography,
      }),
    mutationKey: "/auth/userinfo/",
    retry: false,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    },
    onSuccess: ({ id }) => {
      while (router.canGoBack()) {
        router.back();
      }
      console.log({
        email,
        password,
        full_name: fullName,
        date_of_birth: date?.toISOString().slice(0, 10),
        occupation,
        biography,
        interests: [],
        id,
      });
      updateContextUser({
        email,
        password,
        full_name: fullName,
        date_of_birth: date?.toISOString().slice(0, 10),
        occupation,
        biography,
        interests: [],
        id,
      });
      router.replace("/signup-otp/");
    },
  });

  const {
    mutate: registerUser,
    isLoading: isRegistering,
    isError: isRegisteringError,
    error: registeringError,
  } = useMutation({
    mutationFn: () => register({ email, password }),
    mutationKey: "/auth/register/",
    retry: false,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    },
    onSuccess: () => {
      setUserInfoAfterRegister();
    },
  });

  const handleConfirm = (date: Date) => {
    setDatePickerVisibility(false);
    setTimeout(() => {
      setDate(date);
    }, 0);
  };

  const isDisabled = () => {
    return (
      isRegistering ||
      isUpdatingUserInfo ||
      !email ||
      !password ||
      !date ||
      !fullName ||
      !occupation
    );
  };

  const [yourSelf, setYourSelf] = useState(true);
  const [mother, setMother] = useState(false);

  return (
    <View className="flex-1 bg-white flex">
      <KeyboardAwareScrollView className="h-screen">
        <View className="mb-6">
          <Header leftButton theme="light" />
        </View>
        {/* <View className={`px-5 ${settings ? "mt-6" : "mt-0"}`}>*/}
        <View className="px-5">
          <View>
            <Text className="font-medium text-2xl">{data.title}</Text>
            <Text className="mt-1 text-slate-800">{data.subtitle}</Text>
          </View>
          <View className="mt-10">
            {/* name */}
            <View className="py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <Ionicons name="person-outline" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                placeholder={data.name}
                className="flex-1 h-6 ml-3"
                placeholderTextColor={"#666666"}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            {/* occupation */}

            <View className="mt-7 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <AntDesign name="profile" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                placeholder={data.occupation}
                className="flex-1 h-6 ml-3"
                placeholderTextColor={"#666666"}
                value={occupation}
                onChangeText={setOccupation}
              />
            </View>

            {/* email */}
            <View className="mt-7 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <Fontisto name="email" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                placeholder={data.email}
                keyboardType="email-address"
                className="flex-1 h-6 ml-3"
                autoCapitalize={"none"}
                placeholderTextColor={"#666666"}
                onChangeText={setEmail}
                value={email}
              />
            </View>
            {/* passsword */}

            <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                secureTextEntry={!passwordVisible}
                placeholder={data.password}
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

            {/* Date of Birth */}
            <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                className="flex flex-row items-center w-full"
              >
                <Fontisto name="date" size={19} color="black" style={{ opacity: 0.5 }} />
                <Text className={`ml-3 ${dateChanged ? "text-black" : "text-[#666666]"}`}>
                  {date ? formatDate(date) : data.dateOfBirth}
                </Text>
              </TouchableOpacity>

              {/* Date of Birth  */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                maximumDate={new Date()}
                // max age is 91
                minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 91))}
                date={date ?? new Date("1970-01-01")}
              />
            </View>

            <View className="mt-6 py-2 px-5 bg-white rounded-lg border-[1px] border-solid border-cabaret-500 flex flex-row items-start justify-between">
              <MaterialIcons
                name="description"
                size={19}
                color="black"
                style={{ opacity: 0.5, marginTop: 4 }}
              />
              <TextInput
                multiline
                className="flex-1 h-32 ml-3"
                placeholder={data.bio}
                placeholderTextColor={"#666666"}
                style={{ textAlignVertical: "top" }}
                value={biography}
                onChangeText={setBiography}
              />
            </View>

            <View className="px-5 mt-6 flex">
              <Text className="text-sm text-slate-800 -ml-5 mb-2">
                On whose behalf are you creating this account?
              </Text>
              <View className="-ml-5 flex flex-col justify-between">
                <Pressable onPress={() => {
                  setYourSelf(true);
                  setMother(false);
                }} className="mt-3 flex flex-row items-center">
                  <View className="rounded-full border-[1.5px] border-solid border-cabaret-500 w-4 h-4 flex items-center justify-center">
                    {yourSelf && <View className="bg-cabaret-500 w-2 h-2 rounded-full" />}
                  </View>
                  <Text className="ml-2 text-xs text-slate-700">Yourself</Text>
                </Pressable>

                <Pressable onPress={() => {
                  setMother(true);
                  setYourSelf(false);
                }} className="mt-3 flex flex-row items-center">
                  <View className="rounded-full border-[1.5px] border-solid border-cabaret-500 w-4 h-4 flex items-center justify-center">
                    {mother && <View className="bg-cabaret-500 w-2 h-2 rounded-full" />}
                  </View>
                  <Text className="ml-2 text-xs text-slate-700">Your Mother/Grandmother</Text>
                </Pressable>
              </View>
            </View>
            {isRegisteringError && (
              <View className="mt-4">
                <Text className="text-red-500 font-bold">
                  {axios.isAxiosError(registeringError) && registeringError.response
                    ? (registeringError.response.data.message as any as string)
                    : "An error occured with registration."}
                </Text>
              </View>
            )}

            <View className="mt-8">
              <TouchableOpacity
                onPress={() => registerUser()}
                disabled={isDisabled()}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center"
              >
                {isRegistering || isUpdatingUserInfo ? (
                  <Text className="text-white font-bold text-base">Signing Up...</Text>
                ) : (
                  <Text className="text-white font-bold text-base">Continue</Text>
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

const styles = StyleSheet.create({
  cabaret_shadow: {
    shadowColor: "#FF3366",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
});
