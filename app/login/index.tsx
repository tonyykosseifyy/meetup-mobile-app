import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import Header from "@/components/header";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

export default function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-white flex">
      <Header leftButton />
      <View>
        <Text className="text-cabaret-500 text-center font-medium">
          Share Smiles, Women's Connections
        </Text>
      </View>

      <View className="flex-1 ml-2 mr-2 mt-8 bg-cabaret-500 rounded-t-[40px]">
        <View>
          <Text className="text-white text-center font-bold text-2xl mt-7">Welcome Back</Text>
          <Text className="text-white text-center mt-3">Please login to access your account</Text>
        </View>

        <View className="mt-14 mx-6">
          <View className="p-2 pl-5 pr-5 bg-white h-14 rounded-full flex flex-row items-center justify-between">
            <View>
              <Ionicons name="person-outline" size={19} color="black" style={{ opacity: 0.5 }} />
            </View>
            <TextInput
              onChangeText={setEmail}
              value={email}
              placeholder="Your Email"
              keyboardType="email-address"
              className="flex-1 h-6 ml-3 font-normal"
              placeholderTextColor={"#666666"}
            />
          </View>

          <View className="p-2 pl-5 pr-5 mt-6 bg-white h-14 rounded-full flex flex-row items-center justify-between">
            <View>
              <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
            </View>
            <TextInput
              secureTextEntry={!passwordVisible}
              placeholder="Your Password"
              className="flex-1 h-6 ml-3 font-normal"
              placeholderTextColor={"#666666"}
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
        </View>
      </View>
    </View>
  );
}
