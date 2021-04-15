import { Notification } from 'element-ui';
import { AxiosInstance } from 'axios';

export default function (http: AxiosInstance) {
    http.interceptors.request.use(config => {
        let sessiontoken = sessionStorage.getItem('sessiontoken') || '';
        let freshtoken = sessionStorage.getItem('freshtoken') || '';
        config.headers = {
            ...config.headers,
            sessiontoken, freshtoken,
            authorization: sessiontoken,
            'Access-Control-Expose-Headers': 'sessionToken, freshtoken'
        }
        return config;
    });

    http.interceptors.response.use(response => {
        if (response.headers && response.headers.sessiontoken) {
            sessionStorage.setItem('sessiontoken', response.headers.sessiontoken);
        }
        if (response.headers && response.headers.freshtoken) {
            sessionStorage.setItem('freshtoken', response.headers.freshtoken);
        }
        let { data } = response;
        if (data && data.errno && data.errno === 1000) {
            sessionStorage.removeItem('sessiontoken');
            sessionStorage.removeItem('freshtoken');
            sessionStorage.removeItem('userInfo');
            Notification.error({
                title: '错误',
                message: '登录超时, 请重新登录'
            });
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
        return response;
    });
    return http;
}
