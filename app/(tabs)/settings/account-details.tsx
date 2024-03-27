import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getMe } from "@/api/services/users";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, TextInput } from "react-native";
import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "@/utils/time";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useMutation } from "react-query";
import { updateUser } from "@/api/services/users";
import axios from "axios";
import { useQueryClient } from "react-query";
import styles from "@/constants/styles";
import { Alert } from "react-native";

export default function AccountDetails() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [dateChanged, setDateChanged] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(now.setFullYear(now.getFullYear() - 50));
  });

  const handleConfirm = (date: Date) => {
    setDate(date);
    setDatePickerVisibility(false);
  };
  const {
    mutate: editUser,
    isLoading: isUpdating,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutation({
    mutationFn: () =>
      updateUser({
        full_name: fullName,
        date_of_birth: date?.toISOString().slice(0, 10),
        occupation,
        biography,
      }),
    mutationKey: "/auth/userinfo/update",
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries("/auth/userinfo/");
      Alert.alert("Account Details", "Account details updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    },
  });
  // get user info and populate the form
  const { data: userInfo, isLoading } = useQuery({
    queryKey: "/auth/userinfo/",
    queryFn: () => getMe(),
    retry: 1,
    onSuccess: (data) => {
      const { email, full_name, date_of_birth, occupation, biography } = data;
      console.log(data);
      setEmail(email);
      setFullName(full_name);
      setOccupation(occupation);
      setBiography(biography);
      setDate(new Date(date_of_birth));
      setDateChanged(true);
    },
  });
  if (isLoading && !email) {
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
            <Text className="font-medium text-2xl">Account Details</Text>
            <Text className="mt-1 text-slate-800">All your information can be edited here.</Text>
          </View>
          <View className="mt-10">
            {/* name */}
            <View className="py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <Ionicons name="person-outline" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                placeholder="Your Name"
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
                placeholder="Your Occupation"
                className="flex-1 h-6 ml-3"
                placeholderTextColor={"#666666"}
                value={occupation}
                onChangeText={setOccupation}
              />
            </View>

            {/* email */}
            <View className="mt-7 py-2 px-5 h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500 bg-gray-100">
              <Fontisto name="email" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                placeholder="Your Email"
                keyboardType="email-address"
                className="flex-1 h-6 ml-3"
                placeholderTextColor={"#666666"}
                value={email}
                editable={false}
              />
            </View>

            {/* Date of Birth */}
            <View className="mt-6 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                className="flex flex-row items-center w-full"
              >
                <Fontisto name="date" size={19} color="black" style={{ opacity: 0.5 }} />
                <Text className={`ml-3 ${dateChanged ? "text-black" : "text-[#666666]"}`}>
                  {dateChanged ? formatDate(date) : "Date of Birth"}
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
                placeholder="Bio"
                placeholderTextColor={"#666666"}
                style={{ textAlignVertical: "top" }}
                value={biography}
                onChangeText={setBiography}
              />
            </View>
            {isUpdatingError && (
              <View className="mt-4">
                <Text className="text-red-500 font-bold">
                  {axios.isAxiosError(updatingError) && updatingError.response
                    ? (updatingError.response.data.message as any as string)
                    : "An error occured with registration."}
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
                  <Text className="text-white font-bold text-base">Edit Account</Text>
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
