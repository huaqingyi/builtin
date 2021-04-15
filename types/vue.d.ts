/*
 * @FilePath: /vue-template/src/vue.d.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-07-02 20:15:45
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 11:12:00
 * @debugger: 
 */
import Vue from 'vue';
import { ModalController } from 'vxe-table';
import { checkPermission } from '@/utils/permission';
import { AxiosInstance } from 'axios';
import Router from 'vue-router';
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
    interface Vue {
        $modal: ModalController;
        checkPermission: typeof checkPermission;
        http: AxiosInstance;
        _router: Router;
        _i18n: VueI18n;
    }
}