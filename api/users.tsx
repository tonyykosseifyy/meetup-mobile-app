import axios from "../utils/axios";
import { IUser } from "./interfaces";
import { UserInfo } from "../api/interfaces";

export const lookup = async (): Promise<IUser[]> => await axios.get("/auth/lookup/");

export const getMe = async (): Promise<UserInfo | null> => await axios.get("/auth/userinfo");
