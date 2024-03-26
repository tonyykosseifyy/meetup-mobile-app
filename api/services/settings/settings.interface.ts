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
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: number[];
  email: string;
}


export { IUpdateUserRequest, IUpdateUserResponse };
