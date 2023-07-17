import { AxiosRequestConfig } from 'axios';
import { ValidBearerToken } from '../constants';

export function defaultOptionsWithBearer() {
  return {
    headers: {
      'authorization': `Bearer ${ValidBearerToken}`
    }
  } as AxiosRequestConfig;
}
