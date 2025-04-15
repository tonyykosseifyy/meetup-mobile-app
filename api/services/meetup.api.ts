import {
  IInterestsResponse,
  IUser,
  MeetupRequestRequest,
  MeetupRequestResponse,
} from "@/interfaces";
import AbstractApi from "./abstract-api";
import {
  RequestMeetingsRequest,
  RequestMeetingsResponse,
  RequestPlaceTimeForMeetingRequest,
  RequestPlaceTimeForMeetingResponse,
} from "@/interfaces/meetup.interface";

class Meetup extends AbstractApi {
  private static instance: Meetup | null = null;
  readonly path = "meetup";

  constructor() {
    super("meetup");
  }

  public static getInstance(): Meetup {
    if (Meetup.instance === null) {
      Meetup.instance = new Meetup();
    }
    return Meetup.instance;
  }

  async getAllInterests(): Promise<IInterestsResponse> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/interests",
    });
    return response as IInterestsResponse;
  }

  async getAllCities(): Promise<{ id: string; name: string }[]> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/cities",
      secure: false,
    });
    return response as { id: string; name: string }[];
  }

  async getForYouLookup(): Promise<IUser[]> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/for-you-lookup/",
    });
    return response as IUser[];
  }

  async getNearbyLookup(): Promise<IUser[]> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/nearby-lookup/",
    });
    return response as IUser[];
  }

  async requestMeeting({ userId }: MeetupRequestRequest): Promise<MeetupRequestResponse> {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: `/meeting-requests/create/${userId}/`,
      body: {},
    });
    return response as MeetupRequestResponse;
  }

  async requestMeetings({}: RequestMeetingsRequest): Promise<RequestMeetingsResponse> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/me/meeting-requests/",
    });
    return response as RequestMeetingsResponse;
  }

  async requestPlaceTimeForMeeting({
    id,
    timeSlot,
    place,
  }: RequestPlaceTimeForMeetingRequest): Promise<RequestPlaceTimeForMeetingResponse> {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: `/meeting-requests/${id}/place-time-requests/`,
      body: {
        time_slot: timeSlot,
        place_name: place,
      },
    });
    return response as RequestPlaceTimeForMeetingResponse;
  }

  async retrieveMeeting({ id }: { id: string }): Promise<RequestPlaceTimeForMeetingResponse> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: `/meeting-requests/${id}/`,
    });
    return response as RequestPlaceTimeForMeetingResponse;
  }

  async changeMeetingStatus({ id, status }: { id: number; status: "accept" | "reject" }) {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: `/meeting-requests/respond/${id}/${status}/`,
      body: {},
    });
    return response;
  }
}
export default Meetup;
