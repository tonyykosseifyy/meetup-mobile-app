import React from "react";
import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { Header, Footer } from "@/components";
import { LogoNavbar } from "@/components/logo";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-white flex">
       <View className="pt-4 pb-4">
        <LogoNavbar />
      </View>
 

          
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#656566",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
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
