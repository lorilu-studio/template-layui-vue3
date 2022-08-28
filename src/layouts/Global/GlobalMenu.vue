<template>
  <lay-menu
    :tree="true"
    :collapse="collapse"
    :level="appStore.level"
    :inverted="appStore.inverted"
    :theme="appStore.sideTheme"
    :openKeys="openKeys"
    v-model:selectedKey="selectKey"
    @changeOpenKeys="changeOpenKeys"
  >
    <GlobalMenuItem :menus="userStore.menus"></GlobalMenuItem>
  </lay-menu>
</template>

<script lang="ts">
export default {
  name: "GlobalMenu",
};
</script>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { useAppStore } from "../../store/app";
import { useUserStore } from "../../store/user";
import GlobalMenuItem from "./GlobalMenuItem.vue";
import { diff } from "../../library/arrayUtil";
import { getNode, getParents } from "../../library/treeUtil";

const appStore = useAppStore();
const userStore = useUserStore();

interface MenuProps {
  collapse: boolean;
}

const props = withDefaults(defineProps<MenuProps>(), {
  collapse: false,
});

const route = useRoute();
const router = useRouter();
const selectKey = ref(route.path);
const openKeys = ref(["/workspace"]);

watch(route, (val) => {
  selectKey.value = route.path;
});

watch(selectKey, (val) => {
  router.push(val);
});

const changeOpenKeys = (val: string[]) => {
  const addArr = diff(openKeys.value, val);
  if (val.length > openKeys.value.length && appStore.accordion) {
    var arr = getParents(userStore.menus, addArr[0]);
    openKeys.value = arr.map((item: any) =>{
      return item.id;
    })
  } else {
    openKeys.value = val;
  }
};
</script>

<style>
.layui-nav-tree * {
  font-size: 14px;
}

.layui-nav-tree .layui-nav-item > a,
.layui-nav-tree.inverted .layui-nav-item > a {
  padding: 3px 22px;
}

.layui-nav-tree.inverted .layui-this > a {
  padding: 3px 16px;
}

.layui-nav-tree .layui-nav-item > a > span {
  padding-left: 10px;
}

.layui-nav-tree .layui-nav-item > a .layui-nav-more {
  font-size: 12px;
  padding: 3px 0px;
}
</style>
