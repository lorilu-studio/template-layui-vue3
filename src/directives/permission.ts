import { Directive } from 'vue';
import { useUserInfoStore } from '../store/userInfo';

export const permission: Directive = {
    mounted(el, binding) {
        toolPermission(el, binding);
    },
    updated(el, binding) {
        toolPermission(el, binding);
    }
}

const toolPermission = (el:any, binding:any) => {
    const { value } = binding;
    const userInfoStore = useUserInfoStore();
    const permissions = userInfoStore.permissions;
    if (value && value instanceof Array && value.length > 0) {
        const hasPermission = permissions.some((permission) => {
            return value.includes(permission);
        })
        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
}