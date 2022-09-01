import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { diff } from "../../library/arrayUtil";
import { getParents } from "../../library/treeUtil";
import { useAppStore } from "../../store/app";
import { useUserStore } from "../../store/user";

export function useMenu() {

    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const selectedKey = ref(route.path);
    const openKeys = ref<string[]>([]);
    const isAccordion = computed(() => appStore.accordion);
    const menus = computed(() => userStore.menus);

    watch(route, () => {
        selectedKey.value = route.path;
    })

    watch(selectedKey, () => {
        router.push(selectedKey.value)
    })

    function changeOpenKeys(keys: string[]) {
        const addArr = diff(openKeys.value, keys);
        if (keys.length > openKeys.value.length && isAccordion) {
          var arr = getParents(menus.value, addArr[0]);
          openKeys.value = arr.map((item: any) =>{
            return item.id;
          })
        } else {
          openKeys.value = keys;
        }
    }

    return {
        selectedKey, openKeys, changeOpenKeys, isAccordion, menus
    }
}