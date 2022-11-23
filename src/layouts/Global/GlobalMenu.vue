<template>
  <lay-menu
    :tree="true"
    :collapse="collapse"
    :level="appStore.level"
    :inverted="appStore.inverted"
    :theme="appStore.sideTheme"
    :openKeys="openKeys"
    :selectedKey="selectedKey"
    @changeOpenKeys="changeOpenKeys"
    @changeSelectedKey="changeSelectedKey"
    :class="{'layui-nav-subfield':appStore.subfield}"
  >
    <GlobalMixSider v-if="appStore.subfield" :menus="menus"></GlobalMixSider>
    <GlobalMenuItem :menus="menus" v-else></GlobalMenuItem>
  </lay-menu>
</template>

<script lang="ts">
export default {
  name: "GlobalMenu",
};
</script>

<script lang="ts" setup>
import { useAppStore } from "../../store/app";
import { useUserStore } from "../../store/user";
import GlobalMenuItem from "./GlobalMenuItem.vue";
import GlobalMixSider from "./GlobalMixSider.vue";
import { useMenu } from "../composable/useMenu";
import { onMounted } from 'vue';

const appStore = useAppStore();
const userStore = useUserStore();

interface MenuProps {
  collapse: boolean;
}

const props = withDefaults(defineProps<MenuProps>(), {
  collapse: false,
});

const { selectedKey, openKeys, changeOpenKeys, changeSelectedKey, isAccordion, menus} = useMenu();
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
  font-size: 12px!important;
  padding: 3px 0px;
}
.layui-nav-subfield{
  width: 60px !important;
  height: 100%;
}
.layui-nav-subfield span{
  display: inline-block !important;
}
</style>
