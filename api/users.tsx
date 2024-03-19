import axios from "../utils/axios";
import { IUser } from "./interfaces";
import { UserInfo, UpdateUserInfo } from "../api/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LookupResponse {
  data: {
    users: IUser[];
  };
}

interface UserResponse {
  data: {
    user: UserInfo;
  };
}

export const lookup = async (): Promise<LookupResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.get("/auth/lookup/", { headers: { Authorization: `Bearer ${token}` } });
};

export const getMe = async (): Promise<UserResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.get("/auth/userinfo/", { headers: { Authorization: `Bearer ${token}` } });
};

export const updateUser = async (userInfo: UpdateUserInfo): Promise<UserResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.patch("/auth/userinfo/", userInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
