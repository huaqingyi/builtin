import { AxiosInstance } from 'axios';

// tslint:disable-next-line:interface-name
export interface VuexService {
    http: AxiosInstance;
}

export class Service implements VuexService {
    public http!: AxiosInstance;
}

export type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;

export function useService<S>(Service: ServiceClass<S>) {
    return new Service();
}
