import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { Header, Footer } from "@/components";
import { Link as ExpoLink } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/constants/styles";
import { useLogin } from "@/components/auth/useLogin";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const { mutate: loginUser, isLoading, isError, error } = useLogin();
  if (isError && error instanceof Error) {
    Alert.alert("Login Error", error!.message || "An error occurred during login.");
  }
  const handleLogin = () => {
    loginUser({ email, password });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white flex">
        <Header leftButton theme={"light"} />

        <View className="flex-1 mt-8 flex justify-between pb-10 px-5">
          <View className="flex-1">
            <View className="mt-7">
              <Text className="text-black font-medium text-2xl">Welcome Back</Text>
              <Text className="text-slate-800 mt-1">Please login to access your account</Text>
            </View>

            <View className="mt-14">
              <View className="py-2 px-5 bg-white h-14 rounded-lg flex flex-row items-center justify-between border-[1px] border-solid border-cabaret-500">
                <Ionicons name="person-outline" size={19} color="black" style={{ opacity: 0.5 }} />
                <TextInput
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Your Email"
                  keyboardType="email-address"
                  className="flex-1 h-6 ml-3"
                  placeholderTextColor={"#666666"}
                />
              </View>

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

              <View className="flex flex-row w-full mt-3 justify-end">
                <TouchableOpacity>
                  <Text className="text-gray-700 font-normal text-xs">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <View className="mt-28">
                <ExpoLink href="/" asChild>
                  <TouchableOpacity
                    style={styles.cabaret_shadow}
                    className="p-2 bg-cabaret-500 h-14 rounded-lg flex flex-row items-center justify-center"
                  >
                    {isLoading ? (
                      <Text className="text-white font-bold text-base">Logging in...</Text>
                    ) : (
                      <Text className="text-white font-bold text-base">Continue</Text>
                    )}
                  </TouchableOpacity>
                </ExpoLink>
              </View>
            </View>
          </View>

          <Footer />
        </View>
      </View>
    </SafeAreaView>
  );
}
