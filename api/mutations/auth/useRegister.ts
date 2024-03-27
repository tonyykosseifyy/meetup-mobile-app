// useRegisterMutation.ts
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { IRegisterRequest, IRegisterResponse } from '../../types/auth';
import authApi from '@/api/services/auth';

const useRegisterMutation = () => {
  return useMutation<IRegisterResponse, AxiosError, IRegisterRequest>(registerData => authApi.register(registerData));
};


export default useRegisterMutation;