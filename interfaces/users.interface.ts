interface IUser {
  id?: number;
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
  id?: number;
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

interface IInterest {
  id: number;
  name: string;
}

type IInterestsResponse = IInterest[];
type IInterestsRequest = IInterest[];

export { IUser, IUserInfo, IUpdateUserRequest, IInterestsResponse, IInterestsRequest, IInterest};
