import axios from "axios";
import { IUser } from "./interfaces";

export const lookup = async (): Promise<IUser[]> => axios.get("/auth/lookup");
