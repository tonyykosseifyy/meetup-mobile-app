interface IInterest {
  id: number;
  name: string;
}

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
  email: string;
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: IInterest[];
}

export { IInterest, IUser, IUserInfo };
