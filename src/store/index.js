import { createStore } from 'vuex'

export default createStore({
  state: {
    auth: false,
    url:"https://api.radarna.com:7500/api/",
    baseUrl:"https://api.radarna.com:7500/",
    // url: "http://127.0.0.1:7500/api/",
    // baseUrl: "http://127.0.0.1:7500/",
    user: null,
    userId: null,
    user_role: null,
    darkGreen: [],
    lightGreen: [],
    red: [],
    yellow: [],
    orange: [],
    tanse: {},
    mt_stock: {}
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
