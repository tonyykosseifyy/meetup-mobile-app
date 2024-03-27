// useLookupQuery.ts
import { useQuery } from "react-query";
import { ILookupResponse } from "../../types/home";
import homeApi from "@/api/services/home";
import { AxiosError } from "axios";

const useLookupQuery = () => {
  return useQuery<ILookupResponse, AxiosError>("/auth/lookup/", homeApi.lookup, {
    retry: 1
  });
};

export default useLookupQuery;
