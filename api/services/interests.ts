import { ISetUserResponse } from "@/interfaces";
import axios from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IInterestsRequest, IInterestsResponse } from "@/interfaces";

const getInterests = async (): Promise<IInterestsResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get("/meetup/interests/", { headers: { Authorization: `Bearer ${token}` } });
};


export { getInterests };
