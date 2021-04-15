import { map } from 'lodash';
import { VueConstructor } from 'vue';
import clipboard from './clipboard';
import dialog from './dialog';
import waves from './waves';
import permission from './permission';

export async function uedirs(Vue: VueConstructor) {
    return await Promise.all(map({
        clipboard, dialog, waves, permission
    }, async (dir, name) => {
        return await Vue.directive(name, dir);
    }));
}
