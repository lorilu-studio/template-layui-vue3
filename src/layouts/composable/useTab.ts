import { computed, Ref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useTab() {
  const route = useRoute();
  const router = useRouter();
  const currentPath = computed(() => route.path);
  const tabs: Ref<any> = ref([
    { title: "工作台", id: "/workspace/workbench", closable: false },
  ]);

  const to = (id: string) => {
    router.push(id);
  };

  const close = (id: string) => {
    tabs.value = tabs.value.filter((ele: any) => ele.id != id);
  };

  const closeAll = () => {
    tabs.value = tabs.value.filter((ele: any) => ele.closable == false);
    to(tabs.value[0].id);
  };

  const closeCurrent = () => {
    tabs.value = tabs.value.filter((ele: any) => ele.id != currentPath.value);
    to(tabs.value[0].id);
  }

  const closeOther = () => {
    tabs.value = tabs.value.filter(
      (ele: any) => ele.closable == false || ele.id == currentPath.value
    );
  };

  watch(route, () => {
    let bool = false;
    tabs.value.forEach((tab: any) => {
      if (tab.id === route.path) {
        bool = true;
      }
    });
    if (!bool) {
      tabs.value.push({ id: route.fullPath, title: route.meta.title });
    }
  });

  return {
    to,
    close,
    closeAll,
    closeOther,
    closeCurrent,
    tabs,
    currentPath,
  };
}
