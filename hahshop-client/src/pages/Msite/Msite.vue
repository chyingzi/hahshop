<template>
  <!--首页外卖-->
  <section class="msite">
    <!--首页头部-->
    <HeadTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo' : '/login'">
          <span class="header_login_text" v-if="!userInfo._id">{{ userInfo.name || '登录|注册' }}</span>
          <span class="header_login_text" v-else><i class="iconfont icon-gerenzhongxin"></i> </span>
        </router-link>

    </HeadTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper" v-if="types.length">
          <div class="swiper-slide" v-for="(types,index) in typesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(type,index) in types" :key="index">
              <div class="food_container">
                <img :src="BaseImgUrl+type.image_url">
              </div>
              <span>{{type.title}}</span>
            </a>

          </div>

        </div>
        <img src="./images/msite_back.svg" alt="" v-else>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>

    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>

import HeadTop from "../../components/HeadTop/HeadTop";
import ShopList from "../../components/ShopList/ShopList";
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'
    export default {
      data() {
        return {
          BaseImgUrl: 'https://fuss10.elemecdn.com'
        }
      },
      //监视数据更新
      watch: {
        types(value) {
          this.$nextTick(()=>{//dom元素更新，界面更新，立即调用
            new Swiper ('.swiper-container',{
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
            })
          })

        }
      },
      mounted() {
        this.$store.dispatch('getTypes')
        this.$store.dispatch('getShops')

      },
      computed: {
        ...mapState(['address','types','userInfo']),
        /*根据types生成二维数组，且小数组的元素最大为8*/
        typesArr(){
          const {types} = this
          const OutArr = []
          let InnerArr = []
          types.forEach(type => {
            if(InnerArr.length === 8){
              InnerArr = []
            }
            if(InnerArr.length === 0){
              OutArr.push(InnerArr)
            }
            InnerArr.push(type)
          })
          return OutArr

        }
      },
      components:{
        HeadTop,
        ShopList
      }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';
.msite  //首页
  width 100%
  overflow hidden
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px


</style>
