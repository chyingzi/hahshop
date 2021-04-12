import {RECEIVE_ADDRESS,RECEIVE_TYPES,RECEIVE_SHOPS,RECEIVE_USER,RESET_USER,RECEIVE_SHOP_GOODS,RECEIVE_SHOP_INFO,RECEIVE_SHOP_RATINGS,INCREMENTFOODCOUNT,
  DECREMENTFOODCOUNT,CLEARCART,SEARCH_SHOPS} from "./mutation-types";
import {
  reqAddress,
  reqFoodTypes,
  reqLogout,
  reqShopList,
  reqUserInfo,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShop,
} from "../api";

export default {
  async getAddress({commit, state}) {
    //获取异步地址
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
//获取异步地址
  async getTypes({commit}) {
    const result = await reqFoodTypes()
    if (result.code === 0) {
      const types = result.data
      commit(RECEIVE_TYPES, {types})
    }
  },
  async getShops({commit, state}) {
    //获取异步地址
    const result = await reqShopList(state.longitude, state.latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  //同步获取用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER,{userInfo})
  },

  // 异步读取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code ===0){
      const userInfo = result.data
      commit(RECEIVE_USER,{userInfo})
    }
  },
  // 异步退出登录
  async logout({commit}){
    const  result = await reqLogout()
    if(result.code ===0){
      commit(RESET_USER)
    }
  },
  //获取商品分类
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_SHOP_GOODS, {goods})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },
  //获取商家信息
  async getShopInfo({commit},callback) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_SHOP_INFO, {info})
      //数据更新通知组件
      callback && callback()
    }
  },
  //获取评价
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_SHOP_RATINGS, {ratings})
      //数据更新通知组件
      callback && callback()
    }
  },

  // 同步更新food.count
  updateFoodCount({commit},{isAdd,food}){
    isAdd ? commit(INCREMENTFOODCOUNT,{food}) : commit(DECREMENTFOODCOUNT,{food})
  },
  //清空购物车
  clearCart({commit}){
    commit(CLEARCART)
  },
  //异步搜索商家
  async _searchShops({commit, state},keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(keyword,geohash)
    if (result.code === 0) {
      const searchShops = result.data
      commit(SEARCH_SHOPS, {searchShops})
    }
  },
}
