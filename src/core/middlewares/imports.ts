import { VueConstructor } from 'vue';

export async function imports(Vue: VueConstructor) {
    let uniqueId: number = 0;
    String.prototype.uniqueId = () => ++uniqueId;
    return await Promise.all([
        await import('xe-utils'),
        await import('./use/icons/components'),
        await import('./pwa/register-service-worker'),
    ]);
}