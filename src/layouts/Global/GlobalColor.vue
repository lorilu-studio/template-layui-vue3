<template>
    <ul class="color-list">
        <li :style="{'background':item}" v-for="(item, index) in presetColor" :key="index" @click="handlerChange(item)"><lay-icon v-if="item == modelValue" type="layui-icon-ok"></lay-icon></li>
    </ul>
</template>

<script lang="ts">
export default {
  name: "GlobalColor",
};
</script>

<script lang="ts" setup>
interface ColorProps {
  modelValue: string;
  presetColor?: string[];
}

const props = withDefaults(defineProps<ColorProps>(), {
  modelValue: "#009688",
  presetColor: () => ['#009688','#36b368','#2d8cf0','#f6ad55','#f56c6c','#3963bc']
});

const emits = defineEmits(['update:modelValue'])

const handlerChange = function(color: string) {
    emits('update:modelValue', color);
}
</script>

<style>
.color-list {
    margin: 20px 0px 40px 0px;
}
.color-list li {
    float: left;
    text-align: center;
    height: 30px;
    line-height: 30px;
    width: 30px;
    margin-left: 14px;
    border-radius: 2px;
    color: white;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%);
}
</style>