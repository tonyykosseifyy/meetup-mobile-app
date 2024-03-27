import { useQuery } from "react-query";
import { IGetMeResponse } from "../../types/settings";
import { AxiosError } from "axios";
import settingsApi from "@/api/services/settings";


const useGetMeQuery = () => {
  return useQuery<IGetMeResponse, AxiosError>("/auth/userinfo/", settingsApi.getMe);
};


export default useGetMeQuery;