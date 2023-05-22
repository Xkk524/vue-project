<template>
  <div id="app">
    <tarbar v-show="$store.state.isTarbarShow"></tarbar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css' // Vue.compoments(全局定义组件)
import tarbar from '@/components/Tarbar.vue'

Vue.use(Vant)
export default {
  data () {
    return {
    }
  },
  components: {
    tarbar
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
  width: 100%;
}
ul{
  list-style: none;
}
section{
  padding-bottom: 2.7222rem ;
}
</style>
