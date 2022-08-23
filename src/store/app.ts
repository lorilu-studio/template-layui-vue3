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
      theme: 'light',
      greyMode: false,
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
        }
      ]
  }
})