import { IUser } from "./users.interface";

interface MeetupRequestRequest {
  userId: number;
}
interface MeetupRequestResponse {
  id: number;
  request_from: IUser;
  request_to: IUser;
  status: string;

  place_time_requests: any[];
  request_to_accepting: boolean;
  request_from_accepting: boolean;
}

interface RequestMeetingsRequest {}
type RequestMeetingsResponse = MeetupRequestResponse[];

interface RequestPlaceTimeForMeetingRequest {
  id: number;
  timeSlot: string;
  place: string;
}

interface RequestPlaceTimeForMeetingResponse {
  // later
}
export {
  MeetupRequestRequest,
  MeetupRequestResponse,
  RequestMeetingsRequest,
  RequestMeetingsResponse,
  RequestPlaceTimeForMeetingRequest,
  RequestPlaceTimeForMeetingResponse,
};
