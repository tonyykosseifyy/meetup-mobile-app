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
type IUpdateUserResponse = IUserInfo;

interface IUpdateUserRequest {
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  biography?: string;
  interests_data?: {name: string}[];
}

export {
  IUser,
  IUserInfo,
  IUpdateUserRequest,
  IInterestsResponse,
  IInterestsRequest,
  IInterest,
  IUpdateUserResponse,
};


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
type IUpdateUserResponse = IUserInfo;



export {
  IUser,
  IUserInfo,
  IUpdateUserRequest,
  IInterestsResponse,
  IInterestsRequest,
  IInterest,
  IUpdateUserResponse,
};
