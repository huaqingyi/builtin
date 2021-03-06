import { DirectiveOptions, VNodeDirective } from 'vue';
import { PermissionModule } from '@/store/modules/permission'

function checkPermission(el: HTMLElement, binding: VNodeDirective) {
    const { value } = binding
    const roles: string[] = PermissionModule.roles;

    if (value && value instanceof Array) {
        if (value.length > 0) {
            const permissionRoles = value

            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role)
            })

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    } else {
        throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
}

export default {
    inserted(el: HTMLElement, binding: VNodeDirective) {
        checkPermission(el, binding)
    },
    update(el: HTMLElement, binding: VNodeDirective) {
        checkPermission(el, binding)
    }
} as DirectiveOptions;
