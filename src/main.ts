import Vue from 'vue';
import * as middlewares from '@/core/middlewares';
import store from '@/store';
import { map } from 'lodash';
import App from './app.vue';

Promise.all(map(middlewares, async middleware => {
    await middleware(Vue);
})).then(() => new Vue({
    el: `#app`, router: Vue.prototype._router,
    store, i18n: Vue.prototype._i18n,
    render: h => h(App),
}));