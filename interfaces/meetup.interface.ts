import { IUser } from "./users.interface";

interface MeetupRequestRequest {
  userId: number;
}
interface MeetupRequestResponse {
  id: number;
  request_from: number;
  request_to: number;
  status: string;
  time_slots: [];
  place_requests: [];
  request_to_accepting: IUser;
  request_from_accepting: IUser;
}

interface RequestMeetingsRequest {}
type RequestMeetingsResponse = MeetupRequestResponse[];
export {
  MeetupRequestRequest,
  MeetupRequestResponse,
  RequestMeetingsRequest,
  RequestMeetingsResponse,
};
