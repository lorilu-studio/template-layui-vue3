import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      tab: true,
      logo: true,
      level: true,
      inverted: false,
      routerAlive: true,
      collapse: document.body.clientWidth < 768, // 移动端默认收起，PC端默认展开
      subfield: false,
      theme: 'light',
      breadcrumb: true,
      sideTheme: 'dark',
      greyMode: false,
      accordion: true,
      keepAliveList: [],
      themeVariable: {
        "--global-checked-color": "#5fb878",
        "--global-primary-color": "#009688",
        "--global-normal-color": "#1e9fff",
        "--global-danger-color": "#ff5722",
        "--global-warm-color": "#ffb800",
      },
    }
  },
  persist: {
    storage: localStorage,
    paths: ['tab', 'theme', 'logo', 'level', 'inverted', 'breadcrumb', 'sideTheme', 'greyMode', 'accordion' ,'keepAliveList', 'themeVariable','subfield'],
  }
})