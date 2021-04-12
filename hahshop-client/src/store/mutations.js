import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_TYPES,RECEIVE_USER,RESET_USER,RECEIVE_SHOP_GOODS,RECEIVE_SHOP_INFO,RECEIVE_SHOP_RATINGS,INCREMENTFOODCOUNT,
  DECREMENTFOODCOUNT,CLEARCART,SEARCH_SHOPS} from "./mutation-types";
import Vue from 'vue'
export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_TYPES](state,{types}){
    state.types = types

  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER](state,{userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER](state){
    state.userInfo = {}
  },
 [RECEIVE_SHOP_GOODS](state,{goods}){
  state.goods = goods
  },
  [RECEIVE_SHOP_INFO](state,{info}){
    state.infos = info
  },
  [RECEIVE_SHOP_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [INCREMENTFOODCOUNT](state,{food}){
    if(!food.count){
      Vue.set(food,'count',1)
      //添加food进cartFoods
      state.cartFoods.push(food)
    }else {
      food.count++
    }
  },
  [DECREMENTFOODCOUNT](state,{food}){
    if(food.count){
      food.count--
      if(!food.count){
        // 移除food出cartFoods
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEARCART](state){
    //先清除food中的count
    state.cartFoods.forEach((food)=>food.count = 0)
    state.cartFoods=[]
  },
  [SEARCH_SHOPS](state,{searchShops}){
    state.searchShops = searchShops
  }
}
