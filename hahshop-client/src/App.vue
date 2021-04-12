<template>
  <div class="app">
    <router-view></router-view>
    <FooterGuide/>
  </div>
</template>
<script>
    import FooterGuide from './components/FooterGuide/FooterGuide.vue'
    import {mapActions} from 'vuex'

    export default {
      mounted() {
        this.getAddress()
        this.getUserInfo()
      },
      methods: {
        ...mapActions(['getAddress','getUserInfo'])
      },
      components: {
            FooterGuide
        }

    }
</script>

<style>
    .app {
        width: 100%;
        height: auto 100%;
        background: #f5f5f5;
    }
</style>
