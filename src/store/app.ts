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
      collapse: false,
      theme: 'light',
      breadcrumb: true,
      sideTheme: 'dark',
      greyMode: false,
      accordion: true,
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
      enabled: true,
      strategies: [
        {
          key: 'tab',
          storage: localStorage
        },{
          key: 'theme',
          storage: localStorage
        },{
          key: 'logo',
          storage: localStorage
        },{
          key: 'level',
          storage: localStorage
        },{
          key: 'inverted',
          storage: localStorage
        },{
          key: 'theme',
          storage: localStorage
        },{
          key: 'breadcrumb',
          storage: localStorage
        },{
          key: 'sideTheme',
          storage: localStorage
        },{
          key: 'greyMode',
          storage: localStorage
        },{
          key: 'accordion',
          storage: localStorage
        },{
          key: 'themeVariable',
          storage: localStorage
        }
      ]
  }
})