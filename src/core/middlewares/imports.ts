import { VueConstructor } from 'vue';

export async function imports(Vue: VueConstructor) {
    return await Promise.all([
        await import('xe-utils'),
        await import('./use/icons/components'),
        await import('./pwa/register-service-worker'),
    ]);
}