// import { ISetUserResponse } from "@/interfaces";
// import axios from "../utils/axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IInterestsRequest, IInterestsResponse } from "@/interfaces";

// const getInterests = async (): Promise<IInterestsResponse> => {
//   const token = await AsyncStorage.getItem("accessToken");
//   return await axios.get("/meetup/interests/", { headers: { Authorization: `Bearer ${token}` } });
// };

// const setInterests = async (interests: IInterestsRequest): Promise<ISetUserResponse> => {
//   const token = await AsyncStorage.getItem("accessToken");
//   return await axios.patch(
//     "/auth/userinfo/",
//     { interests_data: interests }, 
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
// };

// export { getInterests, setInterests };