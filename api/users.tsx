import axios from "../utils/axios";
import { IUser } from "./interfaces";
import { UserInfo } from "../api/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const lookup = async (): Promise<IUser[]> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.get("/auth/lookup/", { headers: { Authorization: `Bearer ${token}` } });
};

export const getMe = async (): Promise<{ data: UserInfo } | null> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.get("/auth/userinfo/", { headers: { Authorization: `Bearer ${token}` } });
};
