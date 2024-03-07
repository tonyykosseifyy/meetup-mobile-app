import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { Header } from "@/components";
import { Ionicons, AntDesign, Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const formatDate = (date: Date): string => {
  let day: string = date.getDate().toString().padStart(2, "0");
  let month: string = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero based
  let year: string = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
};

export default function SignupMyself() {
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateChanged, setDateChanged] = useState<boolean>(false);

  const [date, setDate] = useState(new Date());

  const handleConfirm = (date: any) => {
    setDate(date);
    setDatePickerVisibility(false);
  };

  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton theme="light" />
      <ScrollView className="mt-8 px-5">
        <View>
          <Text className="font-medium text-2xl">Start your Story</Text>
          <Text className="mt-1 opacity-70">Join Le2ine, find friends, and share laughs</Text>
        </View>
        <View className="mt-10">
          {/* name */}
          <View className="py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
            <Ionicons name="person-outline" size={19} color="black" style={{ opacity: 0.5 }} />
            <TextInput
              placeholder="Your Name"
              className="flex-1 h-6 ml-3"
              placeholderTextColor={"#666666"}
            />
          </View>
          {/* occupation */}

          <View className="mt-7 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
            <AntDesign name="profile" size={19} color="black" style={{ opacity: 0.5 }} />
            <TextInput
              placeholder="Your Occupation"
              className="flex-1 h-6 ml-3"
              placeholderTextColor={"#666666"}
            />
          </View>

          {/* email */}
          <View className="mt-7 py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
            <Fontisto name="email" size={19} color="black" style={{ opacity: 0.5 }} />
            <TextInput
              placeholder="Your Email"
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
              placeholder="Your Password"
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
                {dateChanged ? formatDate(date) : "Date Of Birth"}
              </Text>
            </TouchableOpacity>

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
          <MaterialIcons name="description" size={19} color="black" style={{ opacity: 0.5, marginTop: 4 }} />
           <TextInput 
              multiline 
              className="flex-1 h-32 ml-3" 
              placeholder="Your Bio" 
              placeholderTextColor={"#666666"}
              style={{ textAlignVertical: "top" }}
            />
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}
