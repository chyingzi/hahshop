<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index === currentIndex}" @click="sliderFood(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{ good.name }}
            </span>
          </li>

        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsList">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       v-lazy="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售 {{ food.sellCount }} 份</span>
                    <span>好评率 {{ food.rating }}%</span></div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>

            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
<!--    显示的food是变化的-->
    <Food :food="food" v-if="isShow" :toggleShow="toggleShow"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from "../../../components/CartControl/CartControl";
import Food from "../../../components/Food/Food";
import ShopCart from "../../../components/ShopCart/ShopCart";
export default {
  components:{
    CartControl,
    Food,
    ShopCart
  },
  data() {
    return {
      scrollY: 0,
      // currentIndex:[]
      tops:[],
      food:{},
      isShow:false
    }
  },
  mounted() {
    this.$store.dispatch("getShopGoods",() => {
      this.$nextTick(() => {//列表数据更新显示后执行
        this._initScroll()
        this._initTops()
    })

    })
  },
  // watch: {
  //   goods() {//监视goods数据更新
  //
  //   }

  methods: {
    _initScroll() {//非事件相关方法用_区分
      new BScroll('.menu-wrapper',{
        click:true
      })
      this.foodsScroll = new BScroll('.foods-wrapper',{
        probeType:2,//惯性滑动不会触发
        click:true

      })
      this.foodsScroll.on('scroll',({x,y}) =>{//绑定scroll监听
        this.scrollY = Math.abs(y)//计算食物列表滑动坐标
      })
      this.foodsScroll.on('scrollEnd',({x,y}) =>{//绑定scroll监听
        this.scrollY = Math.abs(y)//计算食物列表滑动坐标
      })
    },

    _initTops(){
      //初始化tops
      const tops = []
      let top = 0
      tops.push(top)
      //找到所有分类的tops
      const lis = this.$refs.foodsList.querySelectorAll('.food-list-hook')
      Array.prototype.slice.call(lis).forEach((li) => {
        top += li.clientHeight
        tops.push(top)
      })
      //更新数据
      this.tops = tops
    },

    sliderFood(index){
      //及时获取scrollY值
      const scrollY = this.tops[index]
      //更新scrollY值
      this.scrollY = scrollY
      //使右侧平滑滑动
      this.foodsScroll.scrollTo(0,-scrollY,500)

    },
    toggleShow(){
      this.isShow = !this.isShow
    },
    showFood(food){
      this.food = food
      this.toggleShow()
    }
  },

  computed:{//初始化和相关数据发生变化时执行
    ...mapState(["goods"]),
    currentIndex(){//计算当前分类的下标
      const {scrollY,tops} = this
      const index = tops.findIndex((top,index) => {//返回值是布尔值
        return scrollY >= top && scrollY<tops[index+1]
      })
      return index


    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: #bcbf52
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
