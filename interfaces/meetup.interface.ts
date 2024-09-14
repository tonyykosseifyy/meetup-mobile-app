import { IUser } from "./users.interface";

interface MeetupRequest {
  id: number;
  request_from: IUser;
  request_to: IUser;
  status: string;
  place_time_requests: any[];
  request_to_accepting: boolean;
  request_from_accepting: boolean;
}

interface AvatarsReponse {
  id: number;
  image_url: string ;
}

interface MeetupRequestRequest {
  userId: number;
}
type MeetupRequestResponse = MeetupRequest;

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

type RetrieveMeetingResponse = MeetupRequest;
export {
  MeetupRequestRequest,
  MeetupRequestResponse,
  RequestMeetingsRequest,
  RequestMeetingsResponse,
  RequestPlaceTimeForMeetingRequest,
  RequestPlaceTimeForMeetingResponse,
  RetrieveMeetingResponse,
  AvatarsReponse
};
