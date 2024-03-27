import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { IVerifyEmailRequest, IVerifyEmailResponse } from '../../types/auth';
import authApi from '@/api/services/auth';


const useVerifyEmailMutation = () => {
  return useMutation<IVerifyEmailResponse, AxiosError, IVerifyEmailRequest>(verifyData => authApi.verifyEmail(verifyData));
};

export default useVerifyEmailMutation;