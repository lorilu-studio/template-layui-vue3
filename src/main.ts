import { createApp } from 'vue'
import Router from './router'
import Store from './store'
import App from './App.vue'
import './styles/index.css'
import './mock'
import { layer } from "@layui/layer-vue"

createApp(App)
.use(Store)
.use(Router)
.mount('#app');


//- layer挂到window下
window.LVM = {
    layer
}