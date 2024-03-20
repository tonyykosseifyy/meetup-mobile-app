import axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IInterest {
  id: number;
  name: string;
}

interface IInterestsResponse {
  interests: IInterest[];
}


const getInterests = async (): Promise<IInterestsResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get("/meetup/interests/", { headers: { Authorization: `Bearer ${token}` } });
};


export {
  getInterests,
}