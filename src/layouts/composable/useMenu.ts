import { layer } from "@layui/layui-vue";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { menu } from "../../api/module/user";
import { diff } from "../../library/arrayUtil";
import { getParents, getNode } from "../../library/treeUtil";
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
        const andParents = getParents(menus.value, route.path);
        if(andParents && andParents.length > 0) {
            let andParentKeys = andParents.map((item: any) => item.id);
            if(isAccordion.value) {
                openKeys.value = andParentKeys;
            } else {
                openKeys.value = [...andParentKeys, ...openKeys.value];
            }
        }
    }, { immediate: true })

    watch(selectedKey, () => {

        var node = getNode(menus.value, selectedKey.value);

        if(node.type && node.type == "layer") {
            layer.open({
                type: "iframe",
                content: selectedKey.value,
                area: ['80%', '80%']
            })
        } else if (node.type && node.type == "blank") {
            window.open(selectedKey.value, "_blank"); 
        } else {
            router.push(selectedKey.value);
        }
    })

    function changeSelectedKey(key: string) {
        selectedKey.value = key;
    }

    function changeOpenKeys(keys: string[]) {
        const addArr = diff(openKeys.value, keys);
        if (keys.length > openKeys.value.length && isAccordion.value) {
          var arr = getParents(menus.value, addArr[0]);
          openKeys.value = arr.map((item: any) =>{
            return item.id;
          })
        } else {
          openKeys.value = keys;
        }
    }

    return {
        selectedKey, openKeys, changeOpenKeys, changeSelectedKey, isAccordion, menus
    }
}