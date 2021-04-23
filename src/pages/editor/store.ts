import { Action, Mutation } from 'vuex-module-decorators';
import { VuexModule, Module, useService } from '@/core';
import { EditorService, ComponentsResponse } from './service';
import store from '@/store';

@Module({ store })
export class EditorStore extends VuexModule {
    public service: EditorService;
    public components: ComponentsResponse;

    constructor(state: EditorStore) {
        super(state);
        this.service = new EditorService();
        this.components = new ComponentsResponse();
    }

    @Mutation
    public async getComponents() {
        this.components = await useService(EditorService).getComponents();
    }

    // @Action({ commit: 'consoleapiInitSuccess' })
    // public async consoleapiInit(data: { payload: { code: string } }) {
    //     const resp = await this.service.consoleapiInit(data.payload);
    //     if (resp['talefun-retained-console-server']) {
    //         const { accessToken } = resp['talefun-retained-console-server'];
    //         return resp['talefun-retained-console-server'] || {};
    //     }
    //     return {
    //         errno: 1000,
    //         err: new Error('accessToken 获取失败 .'),
    //         errmsg: 'accessToken 获取失败 .',
    //     };
    // }

    // @Mutation
    // public async consoleapiInitSuccess(data: {
    //     payload: { accessToken?: string };
    // }) {
    //     this.accessToken = data.payload.accessToken || '';
    // }
}
