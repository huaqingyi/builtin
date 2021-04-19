import { map } from 'lodash';
import { VueConstructor } from 'vue';
import draggable from './draggable';
import components from './components';

export async function uscomponents(Vue: VueConstructor) {
    return await Promise.all(map({
        ...draggable, ...components,
    }, async (comp, name) => {
        return await Vue.component(name, comp);
    }));
}
