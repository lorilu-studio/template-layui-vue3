import { defineStore } from 'pinia'


export const useUserInfoStore = defineStore({
  id: 'userInfo',
  state: () => {
    return {
      token: '',
      userInfo: {},
      account: '',
      password: ''
    }
  },
  persist: {
      enabled: true,
      strategies: [
        
        {key: 'userInfo', storage: localStorage,  }
      ]
  }
})