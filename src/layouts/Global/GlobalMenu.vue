<template>
  <lay-menu :tree="true" :collapse="collapse" :level="appStore.level" :inverted="appStore.inverted"
    v-model:selectedKey="selectKey" :openKeys="openKeys" @changeOpenKeys="changeOpenKeys">
    <GlobalMenuItem :menus="menus"></GlobalMenuItem>
  </lay-menu>
</template>

<script lang="ts">
export default {
  name: "GlobalMenu",
};
</script>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useAppStore } from "../../store/app";
import GlobalMenuItem from "./GlobalMenuItem.vue";
import { diff } from "../../library/arrayUtil";

const appStore = useAppStore();

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
  if(val.length > openKeys.value.length) {
    openKeys.value = addArr;
  }
  openKeys.value = val;
}

const menus = [
  {
    id: "/workspace",
    icon: "layui-icon-home",
    title: "工作空间",
    children: [
      {
        id: "/workspace/workbench",
        icon: "layui-icon-home",
        title: "工作台"
      },
      {
        id: "/workspace/console",
        icon: "layui-icon-home",
        title: "控制台"
      },
      {
        id: "/workspace/analysis",
        icon: "layui-icon-home",
        title: "分析页"
      }
    ]
  },
  {
    id: "/form",
    icon: "layui-icon-home",
    title: "表单页面",
    children: [
      {
        id: "/form/base",
        icon: "layui-icon-home",
        title: "基础表单"
      },
      {
        id: "/form/step",
        icon: "layui-icon-home",
        title: "分步表单"
      }
    ]
  },
  {
    id: "/table",
    icon: "layui-icon-home",
    title: "列表页面",
    children: [
      {
        id: "/table/base",
        icon: "layui-icon-home",
        title: "查询列表"
      },
      {
        id: "/table/card",
        icon: "layui-icon-home",
        title: "卡片列表"
      }
    ]
  },
  {
    id: "/result",
    icon: "layui-icon-home",
    title: "结果页面",
    children: [
      {
        id: "/result/success",
        icon: "layui-icon-home",
        title: "成功页面"
      },
      {
        id: "/result/failure",
        icon: "layui-icon-home",
        title: "失败页面"
      }
    ]
  }, {
    id: "/error",
    icon: "layui-icon-home",
    title: "异常页面",
    children: [
      {
        id: "/error/403",
        icon: "layui-icon-home",
        title: "403"
      },
      {
        id: "/error/404",
        icon: "layui-icon-home",
        title: "404"
      },
      {
        id: "/error/500",
        icon: "layui-icon-home",
        title: "500"
      }
    ]
  },
  {
    id: "/menu",
    icon: "layui-icon-home",
    title: "菜单嵌套",
    children: [
      {
        id: "/menu/menu1",
        icon: "layui-icon-home",
        title: "二级菜单",
        children: [
          {
            id: "/menu/menu1/menu1",
            icon: "layui-icon-home",
            title: "三级菜单"
          },
          {
            id: "/menu/menu1/menu2",
            icon: "layui-icon-home",
            title: "三级菜单"
          }
        ]
      },
      {
        id: "/menu/menu2",
        icon: "layui-icon-home",
        title: "二级菜单",
        children: [
          {
            id: "/menu/menu2/menu1",
            icon: "layui-icon-home",
            title: "三级菜单"
          },
          {
            id: "/menu/menu2/menu2",
            icon: "layui-icon-home",
            title: "三级菜单"
          }
        ]
      }
    ]
  },{
    id: "/extends",
    icon: "layui-icon-home",
    title: "扩展组件",
    children: [
      {
        id: "/result/success",
        icon: "layui-icon-home",
        title: "成功页面"
      },
      {
        id: "/result/failure",
        icon: "layui-icon-home",
        title: "失败页面"
      }
    ]
  },{
    id: "/directive",
    icon: "layui-icon-home",
    title: "内置指令",
    children: [
      {
        id: "/directive/permission",
        icon: "layui-icon-home",
        title: "权限指令"
      }
    ]
  }
]

</script>

<style>
.layui-nav-tree * {
  font-size: 14px;
}

.layui-nav-tree .layui-nav-item>a,
.layui-nav-tree.inverted .layui-nav-item>a {
  padding: 3px 22px;
}

.layui-nav-tree.inverted .layui-this>a {
  padding: 3px 16px;
}


.layui-nav-tree .layui-nav-item>a>span {
  padding-left: 10px;
}

.layui-nav-tree .layui-nav-item>a .layui-nav-more {
  font-size: 12px;
  padding: 3px 0px;
}
</style>