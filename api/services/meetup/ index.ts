import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";

import {
  RequestMeetingsRequest,
  RequestMeetingsResponse,
  RequestPlaceTimeForMeetingRequest,
  RequestPlaceTimeForMeetingResponse,
  MeetupRequestRequest,
  MeetupRequestResponse,
} from "../../types/meetup";

const meetupApi = {
  requestMeeting: async ({ userId }: MeetupRequestRequest): Promise<MeetupRequestResponse> => {
    const token = await AsyncStorage.getItem("accessToken");

    return await axios.post(
      "/meetup/meeting-requests/create/" + userId + "/",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  requestMeetings: async ({}: RequestMeetingsRequest): Promise<RequestMeetingsResponse> => {
    const token = await AsyncStorage.getItem("accessToken");

    return await axios.get("/meetup/me/meeting-requests/", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  requestPlaceTimeForMeeting: async ({
    id,
    timeSlot,
    place,
  }: RequestPlaceTimeForMeetingRequest): Promise<RequestPlaceTimeForMeetingResponse> => {
    const token = await AsyncStorage.getItem("accessToken");

    return await axios.post(
      `/meetup/meeting-requests/${id}/place-time-requests/`,
      {
        time_slot: timeSlot,
        place_name: place,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  retrieveMeeting: async ({ id }: { id: number }) => {
    const token = await AsyncStorage.getItem("accessToken");

    return await axios.get(`/meetup/meeting-requests/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  changeMeetingStatus: async ({ id, status }: { id: number; status: "accept" | "reject" }) => {
    const token = await AsyncStorage.getItem("accessToken");

    return await axios.post(
      `/meetup/meeting-requests/respond/${id}/${status}/`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};
export default meetupApi;
