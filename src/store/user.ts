import { defineStore } from 'pinia'
import { menu, permission } from "../api/module/user";

export const useUserStore = defineStore({
  id: 'userInfo',
  state: () => {
    return {
      token: '',
      userInfo: {},
      permissions: [],
      menus: [],
    }
  },
  actions: {
    async loadMenus(){
      const { data, code } = await menu();
      if(code == 200) {
        this.menus = data;
      }
    },
    async loadPermissions(){
      const { data, code } = await permission();
      if(code == 200) {
        this.permissions = data;
      }
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