import { AxiosRequestConfig } from 'axios';
declare const VUE_APP_API_BASE_URL: string;

export const httpConfig = {
    baseURL: VUE_APP_API_BASE_URL,
    header: {
        'Content-Type': 'application/json',
    },
} as AxiosRequestConfig;
