import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { diff } from "../../library/arrayUtil";
import { getParents } from "../../library/treeUtil";
import { useAppStore } from "../../store/app";
import { useUserStore } from "../../store/user";

export function useMenu() {

    const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();
    const allowClose = ref(true);
    const tabs = ref([{ title: "工作台", id: "/workspace/workbench", closable: false }]);

    const change = function (id: string) {
        router.push(id);
    };
      
    const close = function (id: string) {
        tabs.value = tabs.value.filter((ele) => ele.id != id);
    };
      
    watch(route, function () {
        let bool = false;
        tabs.value.forEach((tab) => {
          if (tab.id === route.path) {
            bool = true;
          }
        });
        if (!bool) {
          // @ts-ignore
          tabs.value.push({ id: route.fullPath, title: route.meta.title });
        }
    });

    return {
        change, close
    }
}