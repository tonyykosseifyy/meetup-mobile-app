import { useMutation } from 'react-query';
import authApi from '@/api/services/auth';
import { AxiosError } from 'axios';
import { ISetUserRequest, ISetUserResponse } from '../../types/auth';

const useSetUserInfoMutation = () => {
  return useMutation<ISetUserResponse, AxiosError, ISetUserRequest>(userInfo => authApi.setUserInfo(userInfo));
};

export default useSetUserInfoMutation;