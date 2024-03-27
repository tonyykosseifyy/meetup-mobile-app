import { useMutation } from "react-query";
import { MeetupRequestRequest, MeetupRequestResponse } from "../../types/meetup";
import { AxiosError } from "axios";
import meetupApi from "@/api/services/meetup/index";


const useRequestMeetingMutation = () => {
  return useMutation<MeetupRequestResponse, AxiosError, MeetupRequestRequest>(userId => meetupApi.requestMeeting(userId));
};

export default useRequestMeetingMutation;
