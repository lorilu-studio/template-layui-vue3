<template>
  <lay-config-provider
    :themeVariable="appStore.themeVariable"
    :theme="appStore.theme"
  >
    <lay-layout
      :class="[
        appStore.tab ? 'has-tab' : '',
        appStore.collapse ? 'collapse' : '',
        appStore.greyMode ? 'grey-mode' : '',
      ]"
    >
      <!-- side -->
      <div v-if="!appStore.collapse" class="layui-layer-shade hidden-sm-and-up" style="opacity: 0.1; z-index: 9999;"></div>
      <lay-side id="lay-side" :width="sideWidth" :class="appStore.sideTheme == 'dark' ? 'dark':'light'">
        <lay-logo v-if="appStore.logo"></lay-logo>
        <lay-scroll style="height: calc(100% - 62px)">
          <global-menu :collapse="appStore.collapse"></global-menu>
        </lay-scroll>
      </lay-side>
      <lay-layout style="width: 0px">
        <!-- header -->
        <lay-header>
          <lay-menu class="layui-layout-left">
            <lay-menu-item @click="collapse">
              <lay-icon
                v-if="appStore.collapse"
                type="layui-icon-spread-left"
              ></lay-icon>
              <lay-icon v-else type="layui-icon-shrink-right"></lay-icon>
            </lay-menu-item>
            <lay-menu-item class="hidden-xs-only" @click="refresh">
              <lay-icon type="layui-icon-refresh-one"></lay-icon>
            </lay-menu-item>
            <lay-menu-item class="hidden-xs-only" v-if="appStore.breadcrumb" style="padding: 0px 15px;">
              <GlobalBreadcrumb></GlobalBreadcrumb>
            </lay-menu-item>
          </lay-menu>
          <lay-menu class="layui-layout-right">
            <lay-menu-item>
              <lay-fullscreen v-slot="{ toggle, isFullscreen }">
                <lay-icon
                  @click="toggle()"
                  :type="
                    isFullscreen
                      ? 'layui-icon-screen-restore'
                      : 'layui-icon-screen-full'
                  "
                ></lay-icon>
              </lay-fullscreen>
            </lay-menu-item>
            <lay-menu-item>
              <lay-dropdown updateAtScroll placement="bottom">
                <lay-icon type="layui-icon-notice"></lay-icon>
                <template #content>
                  <lay-tab
                    type="brief"
                    style="margin: 5px"
                    v-model="currentIndex"
                  >
                    <lay-tab-item title="选项一" id="1"
                      ><div style="padding: 20px">选项一</div></lay-tab-item
                    >
                    <lay-tab-item title="选项二" id="2"
                      ><div style="padding: 20px">选项二</div></lay-tab-item
                    >
                    <lay-tab-item title="选项三" id="3"
                      ><div style="padding: 20px">选项三</div></lay-tab-item
                    >
                  </lay-tab>
                </template>
              </lay-dropdown>
            </lay-menu-item>
            <lay-menu-item>
              <lay-icon type="layui-icon-website"></lay-icon>
            </lay-menu-item>
            <lay-menu-item>
              <lay-dropdown updateAtScroll placement="bottom">
                <lay-icon type="layui-icon-username"></lay-icon>
                <template #content>
                  <lay-dropdown-menu>
                    <lay-dropdown-menu-item>
                      <template #default>用户信息</template>
                    </lay-dropdown-menu-item>
                    <lay-dropdown-menu-item>
                      <template #default>系统设置</template>
                    </lay-dropdown-menu-item>
                    <lay-line></lay-line>
                    <lay-dropdown-menu-item @click="logOut">
                      <template #default>注销登录</template>
                    </lay-dropdown-menu-item>
                  </lay-dropdown-menu>
                </template>
              </lay-dropdown>
            </lay-menu-item>
            <lay-menu-item @click="changeVisible">
              <lay-icon type="layui-icon-more-vertical"></lay-icon>
            </lay-menu-item>
          </lay-menu>
        </lay-header>
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
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "../store/app";
import { useUserStore } from "../store/user";
import GlobalSetup from "./Global/GlobalSetup.vue";
import GlobalContent from "./Global/GlobalContent.vue";
import GlobalBreadcrumb from "./Global/GlobalBreadcrumb.vue";
import GlobalTab from "./Global/GlobalTab.vue";
import GlobalMenu from "./Global/GlobalMenu.vue";
import { useRouter } from "vue-router";
import { layer } from "@layui/layer-vue";

export default {
  components: {
    GlobalSetup,
    GlobalContent,
    GlobalTab,
    GlobalMenu,
    GlobalBreadcrumb
  },
  setup() {

    const fullscreenRef = ref(null);
    const appStore = useAppStore();
    const userInfoStore = useUserStore();
    const visible = ref(false);
    const router = useRouter();
    const sideWidth = computed(() => appStore.collapse ? "60px" : "220px")

    onMounted(() => {
      // mobile
      if(document.body.clientWidth < 768) {
        appStore.collapse = true;
        document.addEventListener('click', checkClick);
      }
      userInfoStore.loadMenus();
      userInfoStore.loadPermissions();

      layer.notifiy({
        icon: 1,
        title:"欢迎访问",
        content:"已升级到 layui-vue 1.7.8 版本。"
      })
    })

    const checkClick = (event: any) => {
      let dom = document.getElementById("lay-side"); // 这里是侧边栏元素

      if (dom) {
        if (!dom.contains(event.target) && !event.target.classList.contains("layui-icon-spread-left")) {
          // 不在侧边栏内点击，隐藏即可
          console.log("jsjdj:", appStore.collapse)
          if (!appStore.collapse) {
            appStore.collapse = true;
          }
        }
      }
    }

    const changeVisible = function () {
      visible.value = !visible.value;
    };

    const currentIndex = ref("1");

    const collapse = function () {
      appStore.collapse = !appStore.collapse;
    };

    const refresh = function () {
      appStore.routerAlive = false;
      setTimeout(function () {
        appStore.routerAlive = true;
      }, 500);
    };

    const logOut = () => {
      const userInfoStore = useUserStore();
      userInfoStore.token = "";
      userInfoStore.userInfo = {};
      router.push("/login");
    };
    
    return {
      sideWidth,
      changeVisible,
      fullscreenRef,
      collapse,
      appStore,
      refresh,
      visible,
      logOut,
      userInfoStore,
      currentIndex,
    };
  },
};
</script>

<style>
@media screen and (max-width: 767px) {
  .layui-side {
    position: absolute;
    height: 100vh;
  } 

  .layui-header, .layui-body, .layui-footer {
    margin-left: 60px;
  }
}

/*鼠标经过背景色，增加了improtant，否则设置无效*/
.layui-header .layui-nav-item .layui-icon:hover {
  background: whitesmoke !important;
}
/*面包屑颜色兼容*/
.layui-header .layui-nav-item .layui-breadcrumb a {
  color: #999 !important;
}
.layui-header .layui-nav-item .layui-breadcrumb a:nth-last-child(2) {
  color: #666 !important;
}
/*图标默认颜色修复，指定 .layui-icon 去掉improtant，否则无法设置图标其他颜色*/
.layui-header .layui-nav-item .layui-icon {
  color: #666;
}
/*取消默认a标签的padding:0 20px，否则扩大图标后容器变形*/
.layui-header .layui-nav-item > a{
  padding: 0 !important;
}
/*扩大图标尺寸与所在容器大小一致，默认大小导致鼠标必须点击图标才能触发事件效果*/
.layui-header .layui-nav-item .layui-icon{
  height:50px;
  padding: 20px;
}
/*增加鼠标经过图标时改变图标颜色，颜色为当前系统主题色*/
.layui-header .layui-nav-item .layui-icon:hover {
  color: var(--global-primary-color) !important;
}
.grey-mode {
  filter: grayscale(1);
}
</style>