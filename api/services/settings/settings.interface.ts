import { IInterest } from "../interfaces";

interface IOptionalInterest {
  id?: number;
  name: string;
}

interface IUpdateUserRequest {
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  biography?: string;
  interests_data?: IOptionalInterest[];
}
interface IUpdateUserResponse {
  id: number;
  email: string;
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: IInterest[];
}

type IGetMeResponse = IUpdateUserResponse;

export { IUpdateUserRequest, IUpdateUserResponse, IGetMeResponse };
