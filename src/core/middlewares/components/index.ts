import { map } from 'lodash';
import { VueConstructor } from 'vue';
import draggable from './draggable';

export async function uscomponents(Vue: VueConstructor) {
    return await Promise.all(map(draggable, async (comp, name) => {
        return await Vue.component(name, comp);
    }));
}
