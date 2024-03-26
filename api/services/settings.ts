import axios from "../axios";
import { IUpdateUserRequest, IUser, IUserInfo } from "../../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ILookupResponse = IUser[];
type IUserResponse = IUserInfo;


const settingsApi = {
  updateUser: async (userInfo: IUpdateUserRequest): Promise<IUserResponse> => {
    const token = await AsyncStorage.getItem("accessToken");
    return await axios.patch("/auth/userinfo/", userInfo, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

};

export default settingsApi;
