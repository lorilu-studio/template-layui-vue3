import { computed, Ref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useTab() {
  const route = useRoute();
  const router = useRouter();
  const routes = router.getRoutes()
  const currentPath = computed(() => route.path);

  const tabs: Ref<any> = ref([]);
  const tabsCache: string[] = []
  
  // 从路由筛出自定义tab
  if (routes) {
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        tabs.value.push({
          ...route.meta,
          id: route.path,
        })
        tabsCache.push(route.path)
      }
    })
  }

  // 刷新后tabs保留最后一个页面
  if (route.path && !tabsCache.includes(route.path)) {
    const path = routes.find(item => item.path === route.path)
    path && tabs.value.push({
      ...path.meta,
      id: route.path,
    })
  }

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
