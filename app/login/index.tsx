import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { Link, Header } from "@/components";

export default function Login() {
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

      <View
        style={styles.cabaret_shadow}
        className="flex-1 mt-8 bg-cabaret-500 flex justify-between pb-10"
      >
        <View className="flex-1">
          <View>
            <Text className="text-white text-center font-bold text-2xl mt-7">Welcome Back</Text>
            <Text className="text-white text-center mt-3">Please login to access your account</Text>
          </View>

          <View className="mt-14 mx-4">
            <View
              style={styles.shadow}
              className="p-2 pl-5 pr-5 bg-white h-14 rounded-full flex flex-row items-center justify-between"
            >
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

            <View
              style={styles.shadow}
              className="p-2 pl-5 pr-5 mt-6 bg-white h-14 rounded-full flex flex-row items-center justify-between"
            >
              <View>
                <AntDesign name="lock" size={19} color="black" style={{ opacity: 0.5 }} />
              </View>
              <TextInput
                secureTextEntry={!passwordVisible}
                placeholder="Your Password"
                className="flex-1 h-6 ml-3 font-normal"
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
                <Text className="text-white font-bold text-xs">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-28">
              <TouchableOpacity
                style={styles.shadow}
                className="p-2 bg-white h-14 rounded-full flex flex-row items-center justify-center"
              >
                <Text className="text-cabaret-500 font-bold text-base">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mt-12 flex items-center">
          <Text className="font-sans font-regular text-base text-white">
            Don’t have an account?
          </Text>
          <View className="mt-5 flex px-6 flex-row items-baseline justify-between w-full">
            <Link href="/signup/myself">Register Myself</Link>
            <Text className="font-sans text-white text-sm">Or</Text>
            <Link href="/signup/mom">Register Mom</Link>
          </View>
        </View>
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
    shadowColor: "#D14D72",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
});
