import { useMutation, UseMutationResult } from "react-query";
import { AxiosError } from "axios";
import { UpdateUserInfo } from "@/api/interfaces";
import { updateUser } from "@/api/users";

export function useUpdateUserInfo(): UseMutationResult<
  any,
  AxiosError,
  UpdateUserInfo,
  unknown
> {
  return useMutation((userInfo) => updateUser(userInfo));
}
