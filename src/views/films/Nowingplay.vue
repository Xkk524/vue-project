<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="changeDetail(data.filmId)"
      >
        <img :src="data.poster" />
        <div class="title">
          <span>{{ data.name }}</span>
          <span class="item">{{ data.item.name }}</span>
        </div>
        <div class="info">
          <div :class="data.grade ? '' : 'hidden'">
            观众评分：<span style="color: #ffb232">{{ data.grade }}</span>
          </div>
          <!-- 使用过滤器遍历数组 -->
          <div :class="data.actors ? '' : 'hidden'" class="actors">
            主演：{{ data.actors | actorsFilter }}
          </div>
          <!-- 使用v-for循环拿到主演数组里面的人 -->
          <!-- <div class="actors">
                    主演：<span v-for="item in data.actors " :key="item">
                      {{ item.name }}
                    </span>
                  </div> -->
          <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
// import axios from 'axios'
import http from '@/util/http'
import Vue from 'vue'
Vue.filter('actorsFilter', (data) => {
  // console.log(data)
  return data.map((item) => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      cunter: 1,
      total: 0
    }
  },
  mounted () {
    //   axios({
    //       url:'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=2715946',
    //       headers:{
    //         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16787599621476549626822657","bc":"110100"}',
    //         'X-Host': 'mall.film-ticket.film.list'
    //       }
    //   }).then(res=>{
    //     console.log(res.data.data.films)
    //     this.datalist = res.data.data.films
    // })

    // 1.函数式封装axios
    // http.httpList().then(res=>{
    //   this.datalist = res.data.data.films
    // })

    // 2.axios自带的封装
    http({
      url: `gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=2715946`,
      headers: { 'X-Host': 'mall.film-ticket.film.list' }
    }).then((res) => {
      // console.log(res.data.data)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      // 总长度匹配，禁用懒加载
      if (this.datalist.length >= this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.cunter++
      http({
        url: `gateway?cityId=${this.$store.state.cityId}&pageNum=${this.cunter}&pageSize=10&type=1&k=2715946`,
        headers: { 'X-Host': 'mall.film-ticket.film.list' }
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films]

        // 加载状态结束
        this.loading = false
      })
    },
    changeDetail (id) {
      // 编程式导航
      // location.href = '#/detail' 有缺陷

      // 路由官方提供的方式
      // this.$router.push('/detail')

      // 点击后将id作为参数一起传递到detail组件中
      // this.$router.push(`/detail/${id}`)

      // 通过自定义命名路由传参
      this.$router.push({
        name: 'filmsDetail',
        params: {
          id: id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-cell {
  overflow: hidden;
  // height: 5.2222rem;
  padding: 0.5556rem;
  img {
    float: left;
    width: 3.6667rem;
  }
  .title {
    font-size: 16px;
    .item {
      background: #d2d6dc;
      color: #fff;
      font-size: 9px;
      height: 0.7778rem;
      line-height: 0.7778rem;
      border-radius: 2px;
      width: 1.1111rem;
    }
  }
  .info {
    font-size: 13px;
    color: #797d82;
    .actors {
      width: 13.8889rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.hidden {
  visibility: hidden;
}
</style>
