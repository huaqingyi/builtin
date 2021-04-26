import { Vue } from 'vue-property-decorator';
import config from '../../config/sysort';
import interceptor from '../../interceptors/sysort';
import Axios, { AxiosInstance } from 'axios';
import { ComponentConfiguration } from 'jz-component-types';

export interface PackEVAL {
    Config: ComponentConfiguration;
    Component: Vue;
}

export class Sysort {
    public static _components: { [tag: string]: PackEVAL };

    public axios: AxiosInstance;

    constructor() {
        Sysort._components = {};
        this.axios = Axios.create(config);
        this.axios = interceptor(this.axios);
    }

    public async import(tag: string): Promise<PackEVAL> {
        if (Sysort._components[tag]) return Sysort._components[tag];
        const { data } = await this.axios.get(`${tag}.js`, {});
        Sysort._components[tag] = eval(data);
        return Sysort._components[tag];
    }
}

export const sysort = new Sysort();
