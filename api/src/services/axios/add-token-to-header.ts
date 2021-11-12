import { AxiosRequestConfig } from 'axios';

export default (token: string): AxiosRequestConfig => ({ headers: { token } });
