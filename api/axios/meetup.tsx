import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/axios";
import { MeetupRequestRequest, MeetupRequestResponse } from "@/interfaces";
import { RequestMeetingsRequest, RequestMeetingsResponse } from "@/interfaces/meetup.interface";

const requestMeeting = async ({ userId }: MeetupRequestRequest): Promise<MeetupRequestResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.post("/meetup/meeting-requests/create/" + userId + "/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const requestMeetings = async ({}: RequestMeetingsRequest): Promise<RequestMeetingsResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.get("/meetup/me/meeting-requests/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { requestMeeting, requestMeetings };
