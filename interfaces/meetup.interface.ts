import { IUser } from "./users.interface";

interface MeetupRequestRequest {
  userId: number;
}
interface MeetupRequestResponse {
  id: number;
  request_from: IUser;
  request_to: IUser;
  status: string;
  time_slots: [];
  place_requests: [];
  request_to_accepting: boolean;
  request_from_accepting: boolean;
}

interface RequestMeetingsRequest {}
type RequestMeetingsResponse = MeetupRequestResponse[];
export {
  MeetupRequestRequest,
  MeetupRequestResponse,
  RequestMeetingsRequest,
  RequestMeetingsResponse,
};
