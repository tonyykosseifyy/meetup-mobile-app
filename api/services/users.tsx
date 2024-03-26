import axios from "../axios";
import { IUpdateUserRequest, IUser, IUserInfo } from "../../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ILookupResponse = IUser[];
type IUserResponse = IUserInfo;

const lookup = async (): Promise<ILookupResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get("/auth/lookup/", { headers: { Authorization: `Bearer ${token}` } });
};

const getMe = async (): Promise<IUserResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get("/auth/userinfo/", { headers: { Authorization: `Bearer ${token}` } });
};


export { lookup, getMe };
