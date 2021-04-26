import { AxiosInstance } from 'axios';

export default function (http: AxiosInstance) {
    http.interceptors.request.use(config => {
        return config;
    });

    http.interceptors.response.use(response => {
        return response;
    });
    return http;
}
