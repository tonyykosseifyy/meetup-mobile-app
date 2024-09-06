import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../utils/axios";
import { MeetupRequestRequest, MeetupRequestResponse } from "@/interfaces";
import {
  RequestMeetingsRequest,
  RequestMeetingsResponse,
  RequestPlaceTimeForMeetingRequest,
  RequestPlaceTimeForMeetingResponse,
  RetrieveMeetingResponse,
} from "@/interfaces/meetup.interface";

const requestMeeting = async ({ userId }: MeetupRequestRequest): Promise<MeetupRequestResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.post(
    "/meetup/meeting-requests/create/" + userId + "/",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const requestMeetings = async ({}: RequestMeetingsRequest): Promise<RequestMeetingsResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.get("/meetup/me/meeting-requests/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const requestPlaceTimeForMeeting = async ({
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
};

const retrieveMeeting = async ({ id }: { id: string }): Promise<RetrieveMeetingResponse> => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.get(`/meetup/meeting-requests/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const changeMeetingStatus = async ({ id, status }: { id: number; status: "accept" | "reject" }) => {
  const token = await AsyncStorage.getItem("accessToken");

  return await axios.post(
    `/meetup/meeting-requests/respond/${id}/${status}/`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export {
  requestMeeting,
  requestMeetings,
  requestPlaceTimeForMeeting,
  changeMeetingStatus,
  retrieveMeeting,
};
