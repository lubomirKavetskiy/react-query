import axios, { AxiosRequestConfig } from 'axios';

import { User } from '../../../shared/types';
import { baseURL } from './constants';

export function getJWTHeader(user: User): Record<string, string> {
  return { Authorization: `Bearer ${user.token}` };
}

const config: AxiosRequestConfig = { baseURL };
export const axiosInstance = axios.create(config);
