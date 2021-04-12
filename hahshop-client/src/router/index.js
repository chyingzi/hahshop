import Vue from 'vue';
import VueRouter from 'vue-router'

import Shop from "../pages/Shop/Shop";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";

// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Person from '../pages/Person/Person.vue'
const Msite = () => import('../pages/Msite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Person = () => import('../pages/Person/Person.vue')

import Login from "../pages/Login/Login";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: '/msite',
            component: Msite,
            meta:{
                    showFooter:true
            }
        },
        {
            path: '/search',
            component: Search,
            meta:{
              showFooter:true
            }
        },
        {
            path: '/order',
            component: Order,
            meta:{
             showFooter:true
            }
        },
        {
            path: '/person',
            component: Person,
            meta:{
              showFooter:true
            }
        },
      {
            path: '/login',
            component: Login
      },
        {
            path: '/',
            redirect: '/msite'
        },
      {
        path: '/shop',
        component: Shop,
        children:[
          {
          path:'/shop/goods',
          component:ShopGoods
          },
          {
            path:'/shop/ratings',
            component:ShopRatings
          },
          {
            path:'/shop/infos',
            component:ShopInfo
          },
          {
            path: '',
            redirect: '/shop/goods'
          }]
      },
    ]
})
