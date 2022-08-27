<template>
  <lay-config-provider :themeVariable="appStore.themeVariable" :theme="appStore.theme">
    <lay-layout :class="[appStore.tab ? 'has-tab' : '',collapseState ? 'collapse' : '', appStore.greyMode ? 'grey-mode' : '']">
      <!-- side -->
      <lay-side :width="sideWidth">
        <lay-logo v-if="appStore.logo"></lay-logo>
        <lay-scroll style="height: calc(100% - 62px)">
          <global-menu :collapse="collapseState"></global-menu>
        </lay-scroll>
      </lay-side>
      <lay-layout style="width:0px">
        <!-- header -->
        <lay-header>
          <lay-menu class="layui-layout-left">
            <lay-menu-item @click="collapse">
              <lay-icon v-if="collapseState" type="layui-icon-spread-left"></lay-icon>
              <lay-icon v-else type="layui-icon-shrink-right"></lay-icon>
            </lay-menu-item>
            <lay-menu-item>
              <lay-icon type="layui-icon-website"></lay-icon>
            </lay-menu-item>
            <lay-menu-item @click="refresh">
              <lay-icon type="layui-icon-refresh-one"></lay-icon>
            </lay-menu-item>
          </lay-menu>
          <lay-menu class="layui-layout-right">
            <lay-menu-item>
              <lay-fullscreen v-slot="{ toggle, isFullscreen }">
                <lay-icon @click="toggle()" :type="isFullscreen ? 'layui-icon-screen-restore' : 'layui-icon-screen-full'"></lay-icon>
              </lay-fullscreen>
            </lay-menu-item>
            <lay-menu-item>
              <lay-dropdown>
                <lay-icon type="layui-icon-notice"></lay-icon>
                <template #content> 
                    <lay-tab type="brief" style="margin:5px" v-model="currentIndex">
                      <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
                      <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
                      <lay-tab-item title="选项三" id="3"><div style="padding:20px">选项三</div></lay-tab-item>
                    </lay-tab>
                </template>
              </lay-dropdown>
            </lay-menu-item>
            <lay-menu-item>
              <lay-dropdown>
                <lay-icon type="layui-icon-username"></lay-icon>
                <template #content>
                  <lay-dropdown-menu>
                    <lay-dropdown-menu-item>用户信息</lay-dropdown-menu-item>
                    <lay-dropdown-menu-item @click="logOut">注销登录</lay-dropdown-menu-item>
                  </lay-dropdown-menu>
                </template>
              </lay-dropdown>
            </lay-menu-item>
            <lay-menu-item @click="changeVisible">
              <lay-icon type="layui-icon-more-vertical"></lay-icon>
            </lay-menu-item>
          </lay-menu>
        </lay-header>
        <!-- content -->
        <lay-body>
          <global-tab></global-tab>
          <global-content></global-content>
        </lay-body>
        <lay-footer></lay-footer>
      </lay-layout>
    </lay-layout>
    <global-setup v-model="visible"></global-setup>
  </lay-config-provider>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAppStore } from "../store/app";
import { useUserInfoStore } from '../store/userInfo';
import GlobalSetup from "./Global/GlobalSetup.vue";
import GlobalContent from "./Global/GlobalContent.vue";
import GlobalTab from "./Global/GlobalTab.vue";
import GlobalMenu from "./Global/GlobalMenu.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    GlobalSetup,
    GlobalContent,
    GlobalTab,
    GlobalMenu
  },
  setup() {

    const fullscreenRef = ref(null);
    const appStore = useAppStore();
    const userInfoStore = useUserInfoStore();
    const collapseState = ref(false);
    const visible = ref(false);
    const sideWidth = ref("220px");
    const router = useRouter();

    // 配置显隐
    const changeVisible = function () {
      visible.value = !visible.value;
    };

    const currentIndex = ref("1")

    // 侧边状态
    const collapse = function () {
      collapseState.value = !collapseState.value;
      sideWidth.value = collapseState.value ? "60px" : "220px";
    };

    // 路由刷新
    const refresh = function () {
      appStore.routerAlive = false;
      setTimeout(function () {
        appStore.routerAlive = true;
      }, 500);
    };
    // 注销登录
    const logOut = () => {
      const userInfoStore = useUserInfoStore();
      userInfoStore.token = '';
      // 因为类型问题，这里会报错, 严格模式下不可以直接赋 {}
      userInfoStore.userInfo = { username: "", mail: "", remark: "", avatar: "" };
      router.push('/login');
    }
    // return instance
    return {
      sideWidth,
      changeVisible,
      collapseState,
      fullscreenRef,
      collapse,
      appStore,
      refresh,
      visible,
      logOut,
      userInfoStore,
      currentIndex
    };
  },
};
</script>

<style scoped>
.layui-layout-left .layui-nav-item:hover,
.layui-layout-right .layui-nav-item:hover {
  background: whitesmoke;
}

.grey-mode {
  filter: grayscale(1);
}
</style>