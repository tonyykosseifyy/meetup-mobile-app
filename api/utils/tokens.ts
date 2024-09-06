import AsyncStorage from "@react-native-async-storage/async-storage";

const clearTokens = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
};

const setTokens = async (token: string, refreshToken: string) => {
  await AsyncStorage.setItem("accessToken", token);
  await AsyncStorage.setItem("refreshToken", refreshToken);
};

const showTokens = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  console.log("accessToken in storage: ", accessToken);
  console.log("refreshToken in storage: ", refreshToken);
};

export { clearTokens, setTokens, showTokens };
