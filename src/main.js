import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import fastclick from 'fastclick' // 处理移动端延时
import 'common/stylus/index.styl'
import vueLazyload from 'vue-lazyload'
fastclick.attach(document.body)
Vue.use(vueLazyload, {
  loading: require('common/image/img_2.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
