<template>
  <footer class="footer_guide border-1px" v-show="$route.meta.showFooter">
    <span class="guide_item" :class="{on:'/msite'===$route.path}" @click="goTo('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide_item" :class="{on:'/search'===$route.path}" @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search icon-sousuo"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide_item" :class="{on:'/order'===$route.path}" @click="goTo('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide_item" :class="{on:'/person'===$route.path}" @click="goTo('/person')">
      <span class="item_icon">
        <i class="iconfont icon-geren icon-biaoqiankuozhan_wode-330"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>
<script>
    export default {
        methods: {
            goTo(path) {
                this.$router.replace(path)
            }
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .footer_guide {
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        width: 100%;
        height: 50px;
        display: flex;
    }

    .footer_guide::before {
        content: '';
        position: absolute;
        z-index: 200;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: #e4e4e4;
    }

    .footer_guide .guide_item {
        display: flex;
        flex: 1;
        text-align: center;
        flex-direction: column;
        align-items: center;
        margin: 5px;
        color: #999;
    }

    .footer_guide .guide_item.on {
        color: #bcbf52;
    }

    .footer_guide .guide_item span {
        font-size: 12px;
        margin-top: 2px;
        margin-bottom: 2px;
    }

    .footer_guide .guide_item span .iconfont {
        font-size: 22px;
    }
</style>
