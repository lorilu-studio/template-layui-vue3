import { defineStore } from 'pinia'


export const useUserInfoStore = defineStore({
  id: 'userInfo',
  state: () => {
    return {
      token: '',
      userInfo: {
        'username': '',
        'mail': '',
        'remark': '',
        'avatar': ''
      },
      account: '',
      password: ''
    }
  },
  persist: {
      enabled: true,
      detached:true,
      strategies: [
        {key: 'userInfo', storage: localStorage,  }
      ]
  }
})