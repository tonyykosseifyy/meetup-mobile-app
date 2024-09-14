interface IInterest {
  id: number;
  name: string;
}

type IInterestsResponse = IInterest[];
type IInterestsRequest = IInterest[];

interface IUser {
  id?: number;
  email: string;
  user_info: {
    full_name: string;
    date_of_birth: string;
    occupation: string;
    biography: string;
    interests: IInterest[];
    avatar : {
      id: number;
      image_url: string;
    } | null
  };
}

interface IUserInfo {
  id?: number;
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: IInterest[];
  email: string;
  password: string;
  avatar_id: number | null;
  loc_lat: number | null;
  loc_lon: number | null;
  avatar: {
    id: number;
    image_url: string;
  } | null;
}

interface IUpdateUserRequest {
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  biography?: string;
  interests?: number[];
  avatar_id?: number | null;
  loc_lat?: number | null;
  loc_lon?: number | null;
}

interface IChangePasswordRequest {
  name: string;
  email: string;
  password: string;
}
interface IResetPasswordRequest {
  email: string;
  code: string;
  password: string;
}
export {
  IUser,
  IUserInfo,
  IUpdateUserRequest,
  IInterestsResponse,
  IInterestsRequest,
  IInterest,
  IChangePasswordRequest,
  IResetPasswordRequest,
};
