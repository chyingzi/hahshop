import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'
//自定义时间过滤器
Vue.filter('data_format',function (value,formatStr='yyyy-MM-dd  HH:mm:ss'){
  return format(value,formatStr)
})
