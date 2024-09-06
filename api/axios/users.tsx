// import axios from "../utils/axios";
// import {
//   IUpdateUserRequest,
//   IUser,
//   IUserInfo,
//   IChangePasswordRequest,
//   IResetPasswordRequest,
// } from "../../interfaces";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type ILookupResponse = IUser[];
// type IUserResponse = IUserInfo;

// const lookup = async (): Promise<ILookupResponse> => {
//   const token = await AsyncStorage.getItem("accessToken");
//   return await axios.get("/auth/lookup/", { headers: { Authorization: `Bearer ${token}` } });
// };

// const getMe = async (): Promise<IUserResponse> => {
//   const token = await AsyncStorage.getItem("accessToken");
//   return await axios.get("/auth/userinfo/", { headers: { Authorization: `Bearer ${token}` } });
// };

// const updateUser = async (userInfo: IUpdateUserRequest): Promise<IUserResponse> => {
//   const token = await AsyncStorage.getItem("accessToken");
//   return await axios.patch("/auth/userinfo/", userInfo, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// const changePassword = async (changePasswordRequest: IChangePasswordRequest): Promise<void> => {
//   const token = await AsyncStorage.getItem("accessToken");
//   return await axios.post("/auth/change-password/", changePasswordRequest, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// const resetPassword = async (resetPasswordRequest: IResetPasswordRequest): Promise<void> => {
//   return await axios.post("/auth/reset-password/", resetPasswordRequest);
// };

// export { lookup, getMe, updateUser, changePassword, resetPassword };
