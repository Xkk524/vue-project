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
            <div>上映日期：{{ data.premiereAt | playTimeFilter }}</div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </template>
  <script>
  import moment from 'moment'
  import http from '@/util/http'
  import Vue from 'vue'
  Vue.filter('actorsFilter', (data) => {
    // console.log(data)
    return data.map((item) => item.name).join(' ')
  })
  Vue.filter('playTimeFilter',(date) => {
    return moment(date * 1000).format("YYYY-MM-DD")
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
      // 2.axios自带的封装
      http({
        url: `gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=3917163`,
        headers: { 'X-Host': 'mall.film-ticket.film.list' }
      }).then((res) => {
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
          url: `gateway?cityId=${this.$store.state.cityId}&pageNum=${this.cunter}&pageSize=10&type=2&k=3917163`,
          headers: { 'X-Host': 'mall.film-ticket.film.list' }
        }).then((res) => {
          this.datalist = [...this.datalist, ...res.data.data.films]
  
          // 加载状态结束
          this.loading = false
        })
      },
      changeDetail (id) {
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
  