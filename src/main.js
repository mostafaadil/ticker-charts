import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from "vue-axios";
import socket from "@/services/socket";

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(socket)
    .mount('#app')
