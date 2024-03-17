import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Header } from "@/components";
import { Ionicons, AntDesign, Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "./utils";
import { IRegistrationData } from "../../assets/data/registration_data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface RegistrationProps {
  data: IRegistrationData;
}

export default function Registration({ data }: RegistrationProps) {
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateChanged, setDateChanged] = useState<boolean>(false);

  const [date, setDate] = useState(new Date());

  const handleConfirm = (date: any) => {
    setDate(date);
    setDatePickerVisibility(false);
  };
  // Rest of the component code...

  return (
    <View className="flex-1 bg-white flex">
      <KeyboardAwareScrollView className="h-screen">
        {/* <View className="mb-4">
          <Header leftButton theme="light" />
        </View> */}
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
              />
            </View>
            {/* occupation */}

            <View className="mt-7 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
              <AntDesign name="profile" size={19} color="black" style={{ opacity: 0.5 }} />
              <TextInput
                placeholder={data.occupation}
                className="flex-1 h-6 ml-3"
                placeholderTextColor={"#666666"}
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
              />
            </View>
            {/* password */}

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
                maximumDate={new Date(2023, 0, 0)}
                minimumDate={new Date(1900, 0, 0)}
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
              />
            </View>

            <View className="mt-8">
              <TouchableOpacity
                style={styles.cabaret_shadow}
                className="p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center"
              >
                <Text className="text-white font-bold text-base">Continue</Text>
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
