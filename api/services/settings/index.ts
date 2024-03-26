import axios from "../../axios";
import { IUpdateUserResponse, IUpdateUserRequest } from "./settings.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";



const settingsApi = {
  updateUser: async (userInfo: IUpdateUserRequest): Promise<IUpdateUserResponse> => {
    const token = await AsyncStorage.getItem("accessToken");
    return await axios.patch("/auth/userinfo/", userInfo, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
};

export default settingsApi;
