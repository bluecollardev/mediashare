import axios, { AxiosRequestConfig } from 'axios';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { ValidBearerToken } from '../constants';

export function defaultOptionsWithBearer(token) {
  return {
    headers: {
      'authorization': `Bearer ${token || ValidBearerToken}`
    }
  } as AxiosRequestConfig;
}

export async function login(baseUrl, { username, password, clientId }): Promise<AuthenticationResultType> {
  const options = {
    headers: {
      // 'content-type': 'application/json; charset=utf-8',
      'content-type': 'application/json',
      'accept': 'application/json',
    }
  } as AxiosRequestConfig;
  const formData = { username, password, clientId };
  return await axios.post(`${baseUrl}/cognito-testing-login`, formData, options)
    .then((res) => res.data as AuthenticationResultType);
}
