interface IUser {
  email: string;
  user_info: {
    full_name: string;
    date_of_birth: string;
    occupation: string;
    biography: string;
    interests: string[];
  };
}

interface IUserInfo {
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: number[];
  email: string;
  password: string;
}

interface IUpdateUserRequest {
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  biography?: string;
  interests?: number[];
}

export { IUser, IUserInfo, IUpdateUserRequest };
