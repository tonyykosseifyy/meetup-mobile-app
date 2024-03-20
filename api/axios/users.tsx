import axios from "../../utils/axios";
import { IUpdateUserRequest, IUser, IUserInfo } from "../../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ILookupResponse {
  users: IUser[];
}

type IUserResponse = IUserInfo;

const lookup = async (): Promise<ILookupResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get("/auth/lookup/", { headers: { Authorization: `Bearer ${token}` } });
};

const getMe = async (): Promise<IUserResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get("/auth/userinfo/", { headers: { Authorization: `Bearer ${token}` } });
};

const updateUser = async (userInfo: IUpdateUserRequest): Promise<IUserResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.patch("/auth/userinfo/", userInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { lookup, getMe, updateUser };
