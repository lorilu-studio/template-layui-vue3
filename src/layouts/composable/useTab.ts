import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useTab() {

    const route = useRoute();
    const router = useRouter();
    const currentPath = computed(() => route.path);
    const tabs = ref([{ title: "工作台", id: "/workspace/workbench", closable: false }]);

    const change = (id: string) => {
        router.push(id);
    };
      
    const close = (id: string) => {
        tabs.value = tabs.value.filter((ele) => ele.id != id);
    };
      
    watch(route,() => {
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
        change, close, tabs, currentPath
    }
}