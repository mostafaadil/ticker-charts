import { createStore } from 'vuex'

export default createStore({
  state: {
    auth:false,
    url:"http://api.radarna.com:7500/api/",
    baseUrl:"http://api.radarna.com:7500",
    user:null,
    userId:null,
    user_role:null,
    darkGreen: [],
    lightGreen: [],
    red: [],
    yellow: [],
    orange: [],
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
