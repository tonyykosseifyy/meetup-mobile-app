import { useMutation } from "react-query";
import { IUpdateUserRequest, IUpdateUserResponse } from "../../types/settings";
import { AxiosError } from "axios";
import settingsApi from "@/api/services/settings";

const useUpdateUserMutation = () => {
  return useMutation<IUpdateUserResponse, AxiosError, IUpdateUserRequest>((updateUserInfo) =>
    settingsApi.updateUser(updateUserInfo)
  );
};

export default useUpdateUserMutation;
