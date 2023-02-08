import { createApp } from 'vue'
import Router from './router'
import Store from './store'
import App from './App.vue'
import { permission } from "./directives/permission";
import Layui from "@layui/layui-vue";
import '@layui/layui-vue/lib/index.css'
import './mockjs'

const app = createApp(App)

app.use(Layui);
app.use(Router);
app.use(Store);

app.directive("permission",permission);
app.mount('#app');
