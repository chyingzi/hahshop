<template>
  <section class="search">
    <HeadTop title="搜索"/>
    <form class="search_form" @submit.prevent="_searchShops">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyWord">
      <input type="submit" class="search_submit">
    </form>
    <section class="list" v-if="searchShops.length || noSearchShops">
      <ul class="list_container">
        <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li"
                     v-for="item in searchShops" :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
            </div>
          </section>
        </router-link>

      </ul>
    </section>
    <div class="search_none"  v-else="NoShow">很抱歉！没有搜索到匹配的结果</div>
  </section>
</template>
<script>
import HeadTop from "../../components/HeadTop/HeadTop";
import {mapState} from "vuex";

export default {
  components:{
    HeadTop
  },
  watch: {
    searchShops(value) {
      if(!value.length){
        this.NoShow=false
      }
    }
  },
  data() {
    return {
      keyWord: '',
      imgBaseUrl:'http://cangdu.org:8001/img/',
      noSearchShops:true,
      NoShow:true
    }
  },
  methods: {
    _searchShops() {
      const keyword = this.keyWord.trim()
      if(keyword){
        this.$store.dispatch('_searchShops',keyword)
        this.noSearchShops = false
      }
    }
  },
  computed:{
    ...mapState(['searchShops'])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.search
  width 100%
  height 100%
  overflow hidden
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #bcbf52
        font-size 16px
        color #fff
        background-color #bcbf52

  .list
    .list_container
      background-color: #fff;
      .list_li
        display: flex;
        justify-content: center;
        padding: 10px
        border-bottom: 1px solid $bc;
        .item_left
          margin-right: 10px
          .restaurant_img
            width 50px
            height 50px
            display block
        .item_right
          font-size 12px
          flex 1
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    margin: 0 auto
    color: #333
    background-color: #fff
    text-align: center
    margin-top: 0.125rem
</style>
