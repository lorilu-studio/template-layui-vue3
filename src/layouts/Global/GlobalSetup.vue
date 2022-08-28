<template>
  <lay-layer :title="false" :closeBtn="false" type="drawer" area="300px" v-model="visible">
    <div class="global-setup">    
      <global-color v-model="appStore.themeVariable['--global-primary-color']"></global-color>
      <br>
      <br> 
      <global-setup-item label="多选项卡">
        <lay-switch v-model="appStore.tab" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单层级">
        <lay-switch v-model="appStore.level" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单反选">
        <lay-switch v-model="appStore.inverted" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单折叠">
        <lay-switch v-model="appStore.collapse" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="夜间模式">
        <lay-switch v-model="appStore.theme" onswitch-value="dark" unswitch-value="light" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="侧边标题">
        <lay-switch v-model="appStore.logo" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="灰色模式">
        <lay-switch v-model="appStore.greyMode" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单主题">
        <lay-switch v-model="appStore.sideTheme" onswitch-value="dark" unswitch-value="light" size="xs"></lay-switch>
      </global-setup-item>
    </div>
  </lay-layer>
</template>

<script lang="ts">
export default {
  name: "GlobalSetup",
};
</script>

<script lang="ts" setup>
import globalSetupItem from "./GlobalSetupItem.vue";
import globalColor from "./GlobalColor.vue";
import { useAppStore } from "../../store/app";
import { ref, watch } from "vue";

const appStore = useAppStore();

const emits = defineEmits(["update:modelValue"]);

interface SetupProps {
  modelValue: boolean;
}

const props = withDefaults(defineProps<SetupProps>(), {
  modelValue: false,
});

const visible = ref(props.modelValue);

watch(visible, (val) => {
  emits("update:modelValue", val);
});

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  }
);
</script>

<style>
.global-setup {
  padding: 10px;
}
.global-setup .layui-colorpicker {
  margin-right: 10px;
}
</style>
