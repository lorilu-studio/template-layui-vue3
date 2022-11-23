<template>
	<li class="layui-nav-item" v-for="(menu, index) in menus" :key="index" :class="{ 'layui-this': activeIndex === index }" @click="handleClickParentMenu(index)">
		<div class="menu-content">
			<lay-icon :type="menu.icon" style="height: unset; line-height: initial"></lay-icon>
			<span class="menu-title">{{ menu.title }}</span>
		</div>
	</li>
	<div class="layui-nav-tree mix-sub-menu-area" :style="{ width: subSideWidth }">
		<GlobalMenuItem :menus="childrenMenus"></GlobalMenuItem>
	</div>
</template>
<script lang="ts">
export default {
	name: "GlobalMixSider",
};
</script>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "../../store/app";
import GlobalMenuItem from "./GlobalMenuItem.vue";


const route = useRoute();
const appStore = useAppStore();

const subSideWidth = computed(() => (appStore.collapse || childrenMenus.value.length === 0 ? "0px" : "160px"));

interface MixSiderProps {
	menus: any;
}
const props = withDefaults(defineProps<MixSiderProps>(), {
	menus: () => [],
});

const childrenMenus = computed(() => {
	let menus = [];
	let index = activeIndex.value;
	if (index !== -1) {
		menus = props.menus[index].children ?? [];
	}
	appStore.collapse = !(menus.length > 0);
	return menus;
});

const activeIndex = ref(props.menus.findIndex((menu: any) => route.path.includes(menu.id)));

const handleClickParentMenu = (index: number) => {
	activeIndex.value = index;
};
</script>
<style scoped>
.layui-nav-item {
	height: 60px;
	cursor: pointer;
}
.menu-content {
	display: flex;
	flex-flow: column;
	justify-content: space-evenly;
	align-items: center;
	height: 100%;
}
.menu-title {
	height: unset;
	line-height: initial;
	margin-left: 0px !important;
	font-size: 12px;
}
.mix-sub-menu-area {
	height: 100%;
	overflow-y: scroll;
	padding-top: 5px;
	padding-bottom: 5px;
	box-sizing: border-box;
	border-left: 1px solid #ffffff14;
	position: absolute;
	left: 60px;
	top: 0;
}
</style>
