import Vue, { VueConstructor } from 'vue';
import '@/layout/router';
import Router from 'vue-router';
import { createRouter } from '@/router';
import interceptor from '@/interceptors/router';

export async function usrouts(Vue: VueConstructor) {
    Vue.use(Router);

    const router = createRouter();
    Vue.prototype._router = await interceptor(router);
    return router;
}
