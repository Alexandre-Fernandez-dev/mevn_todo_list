import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import VueSweetalert2 from 'vue-sweetalert2';
import '/bootstrap.min.css'
import 'bootstrap'
import 'sweetalert2/dist/sweetalert2.min.css';

// Create a new store instance.
const store = createStore({
    state () {
        return {
            logged: false
        }
    },
    mutations: {
        login (state) {
            state.logged = true
        },
        logout (state) {
            state.logged = false
        }
    },
    plugins: [createPersistedState()]
})

const base = axios.create({
    baseURL: "http://localhost:4000"
});

const app = createApp(App)
app.config.globalProperties.$http = base;
app.use(VueSweetalert2);
app.use(router)
app.use(store)
app.mount('#app');