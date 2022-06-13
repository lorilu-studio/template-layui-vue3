import { createApp } from 'vue'
import Router from './router'
import Store from './store'
import App from './App.vue'
import './styles/index.css'
import './mock'

createApp(App)
.use(Store)
.use(Router)
.mount('#app');
