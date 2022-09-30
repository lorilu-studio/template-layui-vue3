<template>
  <lay-tab
    class="global-tab"
    v-if="appStore.tab"
    :modelValue="currentPath"
    :allowClose="true"
    @change="change"
    @close="close"
  >
    <template :key="tab" v-for="tab in tabs">
      <lay-tab-item
        :id="tab.id"
        :title="tab.title"
        :closable="tab.closable"
      >
        <template #title>
          <span class="dot"></span>
          {{ tab.title }}
        </template>
      </lay-tab-item>
    </template>
  </lay-tab>
</template>

<script lang="ts">
export default {
    name: "GlobalTab"
}
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "../../store/app";
import { useTab } from "../composable/useTab";

const appStore = useAppStore();

const {tabs, change, close, currentPath } = useTab();
</script>

<style>
.layui-tab .dot {
  display: inline-block;
  background-color: whitesmoke;
  margin-right: 8px;
  border-radius: 50px;
  height: 8px;
  width: 8px;
}
.layui-tab .layui-this .dot {
  background-color: var(--global-primary-color);
}
.layui-tab .layui-tab-close:hover {
    background: transparent!important;
    color: #e2e2e2!important;
}
</style>
