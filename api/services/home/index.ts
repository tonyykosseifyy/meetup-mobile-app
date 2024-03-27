import axios from "../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IInterestsResponse, ILookupResponse } from "../../types/home";

const homeApi = {
  getInterests: async (): Promise<IInterestsResponse> => {
    const token = await AsyncStorage.getItem("accessToken");
    return await axios.get("/meetup/interests/", { headers: { Authorization: `Bearer ${token}` } });
  },
  lookup: async (): Promise<ILookupResponse> => {
    const token = await AsyncStorage.getItem("accessToken");
    return await axios.get("/auth/lookup/", { headers: { Authorization: `Bearer ${token}` } });
  },
};

export default homeApi;
