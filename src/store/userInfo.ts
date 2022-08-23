import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore({
  id: 'userInfo',
  state: () => {
    return {
      token: '',
      userInfo: {},
      permissions: ['sys:user:add','sys:user:edit','sys:user:delete','sys:user:import','sys:user:export'],
      menus: [],
    }
  },
  persist: {
      enabled: true,
      detached: true,
      strategies: [
        {key: 'userInfo', storage: localStorage,  }
      ]
  }
})