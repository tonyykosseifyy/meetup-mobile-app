export interface IUser {
  email: string;
  user_info: {
    full_name: string;
    date_of_birth: string;
    occupation: string;
    biography: string;
    interests: string[];
  };
}

export interface UserInfo {
  full_name: string | null;
  date_of_birth: string | null;
  occupation: string | null;
  biography: string | null;
  interests: number[] | [] | null;
  email: string | null;
  password: string | null;
}
export interface UpdateUserInfo {
  data: {
    full_name?: string | null;
    date_of_birth?: string | null;
    occupation?: string | null;
    biography?: string | null;
    interests?: number[] | [] | null;
    email?: string | null;
    password?: string | null;
  };
}
export interface UserInfoSettings {
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: number[] | [];
  email: string;
  password: string;
}
