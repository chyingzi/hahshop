/*包含n个接口请求函数的模块*/
import ajax from "./ajax";
const BaseUrl = '/api'

// [1、根据经纬度获取位置详情](#1 根据经纬度获取位置详情)
export const reqAddress = (geohash) => ajax(`${BaseUrl}/position/${geohash}`)

// [2、获取食品分类列表](#2 获取食品分类列表)
export const reqFoodTypes = () => ajax(`${BaseUrl}/index_category`)

// [3、根据经纬度获取商铺列表](#3 根据经纬度获取商铺列表)
export const reqShopList = (longitude,latitude) => ajax(BaseUrl+`/shops`,{longitude,latitude})

// [4、根据经纬度和关键字搜索商铺列表](#4 根据经纬度和关键字搜索商铺列表)
export const reqSearchShop = (keyword, geohash) => ajax(`${BaseUrl}/search_shops`,{keyword, geohash})

// [5、获取一次性验证码](#5 获取一次性验证码)
export const reqCaptcha = () => ajax(`${BaseUrl}/captcha`)

// [6、用户名密码登陆](#6 用户名密码登陆)
export const reqLoginPwd = ({name,pwd,captcha}) => ajax(BaseUrl+`/login_pwd`,{name,pwd,captcha},'POST')

// [7、发送短信验证码](#7 发送短信验证码)
export const reqSendCode = (phone) => ajax(`${BaseUrl}/sendcode`,{phone})

// [8、手机号验证码登陆](#8 手机号验证码登陆)
export const reqLoginSms = (phone,code) => ajax(`${BaseUrl}/login_sms`,{phone,code},'POST')

// [9、根据会话获取用户信息](#9 根据会话获取用户信息)
export const reqUserInfo = () => ajax(`${BaseUrl}/userinfo`)

// [10、用户登出]
export const reqLogout = () => ajax(`${BaseUrl}/logout`)



export const reqShopGoods = () => ajax(`/good`)
export const reqShopInfo = () => ajax(`/info`)
export const reqShopRatings = () => ajax(`/ratings`)
