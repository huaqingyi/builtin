import { AxiosRequestConfig } from 'axios';

export default {
    baseURL: `http://localhost:8080/js/`,
    header: {
        'Content-Type': 'application/json',
    },
} as AxiosRequestConfig;