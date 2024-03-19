import axios from "axios";
import { IUser } from "./interfaces/users.interface";

export const lookup = () : Promise<IUser[]> => axios.get("/users/");


// export const register = ({ email, password }: RegisterCredentials): Promise<RegisterResponse> =>
//   axios.post("/auth/register/", { email, password });