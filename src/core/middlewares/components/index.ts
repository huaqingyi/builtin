import { map } from 'lodash';
import { VueConstructor } from 'vue';
import draggable from './draggable';
import components from './components';
import { Asynent } from './asynent';

export async function uscomponents(Vue: VueConstructor) {
    return await Promise.all(map({
        ...draggable, ...components, asynent: Asynent,
    }, async (comp, name) => {
        return await Vue.component(name, comp);
    }));
}
