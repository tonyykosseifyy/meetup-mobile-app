import { useMutation } from 'react-query';
import authApi from "../../services/auth";
import { ILoginRequest, ILoginResponse } from "../../types/auth";
import { AxiosError } from 'axios';


const useLoginMutation = () => {
  return useMutation<ILoginResponse, AxiosError, ILoginRequest>(loginData => authApi.login(loginData));
};

export default useLoginMutation;