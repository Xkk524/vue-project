import Vue from 'vue'
import App from './App.vue'
// import App from './PCApp.vue'
// 导入index.js的router
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  // 挂载导入router实例
  router, // 创建实例化对象后会自动生成 this.$router === router
  store, // this.$store === store  访问store对象
  render: h => h(App)
}).$mount('#app')
