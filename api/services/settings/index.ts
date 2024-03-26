import axios from "../../axios";
import { IUpdateUserResponse, IUpdateUserRequest, IGetMeResponse } from "./settings.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";



const settingsApi = {
  getMe: async (): Promise<IGetMeResponse> => {
    const token = await AsyncStorage.getItem("accessToken");
    return await axios.get("/auth/userinfo/", { headers: { Authorization: `Bearer ${token}` } });
  },
  updateUser: async (userInfo: IUpdateUserRequest): Promise<IUpdateUserResponse> => {
    const token = await AsyncStorage.getItem("accessToken");
    return await axios.patch("/auth/userinfo/", userInfo, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
};

export default settingsApi;
