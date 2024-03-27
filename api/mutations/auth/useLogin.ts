// src/api/auth/useLoginMutation.ts
import { useMutation } from 'react-query';
import axios from 'axios';
import { ILoginRequest, ILoginResponse } from '../../types/authTypes';


const useLoginMutation = () => {
  return useMutation<ILoginResponse, Error, ILoginRequest>(loginData => login(loginData));
};

export default useLoginMutation;