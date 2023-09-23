import store from "../store/index"
import axios from "axios"

var state = store.state
console.log(state)
export default {
    install(Vue) {
        var self = Vue.config.globalProperties
        Vue.config.globalProperties.http = {
            post(url,data,options){
                return new Promise((resolve)=>{
                    if(!options) options = {}
                if(!options.headers) options.headers = {}
                if(state.token){
                    options.headers['x-auth'] = state.token
                    data.user_id = state.currentUser.id
                }
                console.log(options);
                //  data.lang = Vue.config.globalProperties.$i18n.locale
                axios.post(state.baseUrl+url,data,options)
                .then((resp)=>{
                    console.log(resp.headers["x-auth"]);
                    if(resp.headers["x-auth"]){
                        state.token = resp.headers["x-auth"]
                        console.log(data.pass)
                        resp.data.data.pass = self.$e.encrypt(data.pass)
                        state.currentUser = resp.data.data
                        localStorage.currentUser = JSON.stringify(resp.data.data)
                        console.log(state.token);
                    }
                    if(resp.data.status){
                        resolve(resp.data)
                    }
                    else{
                        Vue.config.globalProperties.popup.alert("popups.error",resp.data.msg)
                    }
                })
                })
            },
            do(url,data,options){
                return new Promise((resolve)=>{
                    if(!options) options = {}
                if(!options.headers) options.headers = {}
                if(state.token){
                    options.headers['x-auth'] = state.token
                    data.user_id = state.currentUser.id
                }
                console.log(options);
                data.lang = Vue.config.globalProperties.$i18n.locale
                var formData = new FormData()
                for(var key in data){
                    formData.append(key,data[key])
                }
                axios.post(state.baseUrl+url,formData,options)
                .then((resp)=>{
                    console.log(resp.headers["x-auth"]);
                    if(resp.headers["x-auth"]){
                        state.token = resp.headers["x-auth"]
                        console.log(data.pass)
                        resp.data.data.pass = self.$e.encrypt(data.pass)
                        state.currentUser = resp.data.data
                        localStorage.currentUser = JSON.stringify(resp.data.data)
                        console.log(state.token);
                    }
                    if(resp.data.status){
                        resolve(resp.data)
                    }
                    else{
                        Vue.config.globalProperties.popup.alert("popups.error",resp.data.msg)
                    }
                })
                })
            },
         
            put(url,id,data,options){
                return new Promise((resolve)=>{
                    if(!options) options = {}
                if(!options.headers) options.headers = {}
                if(state.token){
                    options.headers['x-auth'] = state.token
                    data.user_id = state.currentUser.id
                }
                console.log(options);
                data.lang = Vue.config.globalProperties.$i18n.locale
                axios.put(state.baseUrl+url+"/"+id,data,options)
                .then((resp)=>{
                    console.log(resp.headers["x-auth"]);
                    if(resp.headers["x-auth"]){
                        state.token = resp.headers["x-auth"]
                        console.log(data.pass)
                        resp.data.data.pass = self.$e.encrypt(data.pass)
                        state.currentUser = resp.data.data
                        localStorage.currentUser = JSON.stringify(resp.data.data)
                        console.log(state.token);
                    }
                    if(resp.data.status){
                        resolve(resp.data)
                    }
                    else{
                        Vue.config.globalProperties.popup.alert("popups.error",resp.data.msg)
                    }
                })
                })
            }, 
            get(url,options){
                return new Promise((resolve)=>{
                    var data ={}
                    if(!options) options = {}
                if(!options.headers) options.headers = {}
                if(state.token){
                    options.headers['x-auth'] = state.token
                    data.user_id = state.currentUser.id
                }
                console.log(options);
                data.lang = Vue.config.globalProperties.$i18n.locale
                axios.get(state.baseUrl+url+"?"+(new URLSearchParams(data).toString() ),data,options)
                .then((resp)=>{
                    // console.log("the status is",resp.data.status)
                    console.log(resp.headers["x-auth"]);
                    if(resp.headers["x-auth"]){
                        state.token = resp.headers["x-auth"]
                        console.log(data.pass)
                        resp.data.data.pass = self.$e.encrypt(data.pass)
                        state.currentUser = resp.data.data
                        localStorage.currentUser = JSON.stringify(resp.data.data)
                        console.log(state.token);
                    }
                    if(resp.data.status){
                        resolve(resp.data)
                    }
                    else{
                        Vue.config.globalProperties.popup.alert("popups.error",resp.data.msg)
                    }
                })
                })
            },
            delete(url,id,options){
                return new Promise((resolve)=>{
                    var data ={}
                    if(!options) options = {}
                if(!options.headers) options.headers = {}
                if(state.token){
                    options.headers['x-auth'] = state.token
                    data.user_id = state.currentUser.id
                }
                console.log(options);
                data.lang = Vue.config.globalProperties.$i18n.locale
                axios.delete(state.baseUrl+url+"/"+id+"?"+(new URLSearchParams(data).toString()) ,options)
                .then((resp)=>{
                    console.log(resp.headers["x-auth"]);
                    if(resp.headers["x-auth"]){
                        state.token = resp.headers["x-auth"]
                        console.log(data.pass)
                        resp.data.data.pass = self.$e.encrypt(data.pass)
                        state.currentUser = resp.data.data
                        localStorage.currentUser = JSON.stringify(resp.data.data)
                        console.log(state.token);
                    }
                    if(resp.data.status){
                        resolve(resp.data)
                    }
                    else{
                        Vue.config.globalProperties.popup.alert("popups.error",resp.data.msg)
                    }
                })
                })
            },
        }
    }
}