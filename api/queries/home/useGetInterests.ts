import { useQuery } from "react-query";
import { IInterestsResponse } from "../../types/home";
import homeApi from "@/api/services/home";
import { AxiosError } from "axios";


const useGetInterestsQuery = () => {
  return useQuery<IInterestsResponse, AxiosError>("/meetup/interests/", homeApi.getInterests, {
    retry: 1
  });
};

export default useGetInterestsQuery;