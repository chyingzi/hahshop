<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">哈哈外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getTime">
                {{TimeOut?`已发送（${TimeOut}s）`:'发送验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册哈哈外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="pwdShow">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="pwdShow ?'on':'off'" @click="pwdShow = !pwdShow">
                  <div class="switch_circle" :class="{right:pwdShow}"></div>
                  <span class="switch_text">{{pwdShow?"abc":''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>

        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-arrow-left-bold icon-arrowLeft-fill"></i>
      </a>
    </div>
    <AlertTip :alert-text="alertText" v-show="Showalert" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip";
import {reqSendCode,reqLoginSms,reqLoginPwd} from "../../api";

export default {
  data() {
    return {
      loginWay: true,
      phone:'',
      TimeOut:0,
      pwd:'',
      pwdShow:false,
      captcha:'',
      code:'',
      name:'',
      alertText:'',
      Showalert:false

    }
  },
  components:{
    AlertTip
  },
  computed: {
    rightPhone() {
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      return reg.test(this.phone)
    }
  },
  methods: {
    //异步获取短信验证码
    async getTime() {
      if(!this.TimeOut){
        this.TimeOut = 30
        this.intervalId = setInterval(() => {
          this.TimeOut--
          if(this.TimeOut <=0){
            clearInterval(this.intervalId)
          }
        },1000)
        //发送ajax请求
        const result = await reqSendCode(this.phone)
        if(result.code === 1){
          this.alertShow(result.msg)
          //停止计数器
          if(this.TimeOut){
            this.TimeOut = 0
            clearInterval(this.intervalId)
            this.intervalId = underfined
          }
        }
      }
    },
    alertShow(alertText){
      this.Showalert = true
      this.alertText = alertText
    },
    //异步登录
    async login(){
      let result
      //前台表单验证
      if(this.loginWay){//短信登录
        const {rightPhone,phone,code} = this
        if(!rightPhone){
          //手机号码不正确
          this.alertShow('手机号码不正确')
          return

        }else if(!/^\d{6}$/.test( code)){
          //验证码不正确
          this.alertShow('验证码必须是6位数')
          return
        }
        // 发送ajax请求短信登录
        result = await reqLoginSms(phone,code)

      }else{//密码登录
          const {name,pwd,captcha} = this
          if(!name){
            //用户名必须指定
            this.alertShow('用户名必须指定')
            return
          }else if(!pwd){
            //密码必须指定
            this.alertShow('密码必须指定')
            return
          }else if(!captcha) {
            //验证码必须指定
            this.alertShow('验证码必须指定')
            return
          }
          // 发送ajax请求短信登录
          result = await reqLoginPwd({name,pwd,captcha})
        }

      //停止计数器
      if(this.TimeOut){
        this.TimeOut = 0
        clearInterval(this.intervalId)

      }
        //根据结果处理数据
        if(result.code === 0){
          const user = result.data
          //讲user保存到vuex的state
          this.$store.dispatch('recordUser',user)
          this.$router.replace('/person')
        }else {
          //获取新的图片验证码
          this.getCaptcha()
          //显示警告提示
          const msg = result.msg
          this.alertShow(msg)
        }


    },
    closeTip() {
      this.Showalert = false
      this.alertText = ''

    },
    //获取一个新的图片验证码
    getCaptcha(){
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
    }

  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #bcbf52
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #bcbf52
            font-weight 700
            border-bottom 2px solid #bcbf52
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #bcbf52
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #bcbf52
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(26px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #bcbf52
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #929537
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 30px
        color #999
</style>
