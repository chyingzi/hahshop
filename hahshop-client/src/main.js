/* 入口js */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {Button} from 'mint-ui'
import './mock/mockServer'

import './filters'


import VueLazyload from "vue-lazyload";
import loading from './common/image/loading.gif'


Vue.use(VueLazyload, {
  loading
})

//注册全局标签
Vue.component(Button.name,Button)//<mt-button>
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store

})
