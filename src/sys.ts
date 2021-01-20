import { Sysort } from 'vue-pandora-decorators';

const sysort = Sysort.create({});

sysort.interceptors.request.use(request => {
    return request;
});

sysort.interceptors.response.use(response => {
    return response;
});

export { sysort };
