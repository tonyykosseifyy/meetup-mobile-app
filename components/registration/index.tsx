import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRegister } from "../../api/mutations/auth/useRegister";
import { useSetUserInfo } from "../../api/mutations/auth/useSetUserInfo";
import { IRegistrationData } from "@/assets/data/registration_data";
import Header from "../header";
import { AntDesign, Feather, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatDate } from "./utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import { UserInfo } from "@/interfaces";
import { useUpdateUserInfo } from "../../api/mutations/auth/useUpdateUserInfo";
import { useQuery } from "react-query";
import { getMe } from "@/api/axios/users";
import { useQueryClient } from "react-query";

interface RegistrationProps {
  data: IRegistrationData;
  settings?: boolean;
  userInfo?: UserInfo;
}

export default function Registration({ data, settings, userInfo }: RegistrationProps) {
  // State hooks for form inputs
  const queryClient = useQueryClient();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [dateChanged, setDateChanged] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(now.setFullYear(now.getFullYear() - 50));
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  // Setup the mutations
  const { mutate: registerUser, isLoading: isRegistering } = useRegister();
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const { mutate: setUserInfo, isLoading: isSettingUserInfo } = useSetUserInfo();
  // get user
  const { data: userInfoData, isLoading } = useQuery("me", getMe);

  const [error, setError] = useState<unknown>();

  const handleConfirm = (date: Date) => {
    setDate(date);
    setDatePickerVisibility(false);
  };
  useEffect(() => {
    if (userInfoData?.data) {
      // Check for each piece of userInfoData and update state accordingly
      userInfoData.data.full_name && setFullName(userInfoData.data.full_name);
      userInfoData.data.occupation && setOccupation(userInfoData.data.occupation);
      userInfoData.data.date_of_birth && setDate(new Date(userInfoData.data.date_of_birth));
      userInfoData.data.biography && setBiography(userInfoData.data.biography);
      userInfoData.data.email && setEmail(userInfoData.data.email);
      userInfoData.data.password && setPassword(userInfoData.data.password);
      console.log(userInfoData.data);
    }
  }, [userInfoData]); // Dependency array ensures this effect runs only when userInfoData changes

  const router = useRouter();

  const handleSubmit = () => {
    !settings
      ? registerUser(
          { email, password },
          {
            onError: (error) => {
              console.log(error.data);
              setError(error);
            },
            onSuccess: () => {
              setUserInfo(
                {
                  email,
                  password,
                  full_name: fullName,
                  date_of_birth: date?.toISOString().slice(0, 10),
                  occupation,
                  biography,
                },
                {
                  onSuccess: () => {
                    while (router.canGoBack()) {
                      router.back();
                    }
                    queryClient.invalidateQueries("me");
                    console.log("here");
                    router.replace("/signup-otp/");
                  },
                  onError: (error) => {
                    console.log("error");
                    console.log(error.response);
                  },
                }
              );
            },
          }
        )
      : updateUserInfo(
          {
            email,
            password,
            full_name: fullName,
            date_of_birth: date?.toISOString().slice(0, 10),
            occupation,
            biography,
            interests: [],
          },
          {
            onSuccess: () => {
              alert("User info updated");
              queryClient.invalidateQueries("me");
            },
            onError: (error) => {
              console.log("error");
              console.log(error.response.data);
            },
          }
        );
  };

  // The UI component code remains the same as in your snippet
  return (
    <View className="flex-1 bg-white flex">
      <KeyboardAwareScrollView className="h-screen">
        {!settings && (
          <View className="mb-6">
            <Header leftButton theme="light" />
          </View>
        )}
        <View className={`px-5 ${settings ? "mt-6" : "mt-0"}`}>
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
                  {dateChanged ? formatDate(date) : data.dateOfBirth}
                </Text>
              </TouchableOpacity>

              {/* Date of Birth  */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 0)}
                date={date}
                onChange={() => setDateChanged(true)}
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
            {error && (
              <View className="mt-4">
                <Text className="text-red-500">
                  {error?.response?.data?.message ?? "An error occured with registration."}
                </Text>
              </View>
            )}

            <View className="mt-8">
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isRegistering || isSettingUserInfo || !email || !password || !date}
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center"
              >
                {isRegistering || isSettingUserInfo ? (
                  <Text className="text-white font-bold text-base">Logging in...</Text>
                ) : (
                  <Text className="text-white font-bold text-base">
                    {settings ? "Confirm" : "Continue"}
                  </Text>
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
