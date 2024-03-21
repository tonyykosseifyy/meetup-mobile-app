import { ISetUserResponse } from "@/interfaces";
import axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IInterest {
  id: number;
  name: string;
}

type IInterestsResponse = IInterest[];

const getInterests = async (): Promise<IInterestsResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get("/meetup/interests/", { headers: { Authorization: `Bearer ${token}` } });
};

const setInterests = async (interests: string[]): Promise<ISetUserResponse> => {
  console.log("interests=>", interests);
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.patch(
    "/auth/userinfo/",
    { interests },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export { getInterests, setInterests };
