<template>
  <div>
    <van-nav-bar title="影院"  ref="navbar" @click-left="handelClick" @click-right="handelRightClick">
      <template #left >
        {{$store.state.cityName}}<van-icon name="arrow-down" color="black"/>
      </template>
      <template #right>
        <van-icon name="search" size="20" color="black" />
      </template>
    </van-nav-bar>
    <div class="box" :style="{ height: height }">
      <ul>
        <li v-for="data in $store.state.cityListData" :key="data.cinemaId">
          <div class="left">
            <div class="left-name">{{ data.name }}</div>
            <div class="left-address">{{ data.address }}</div>
          </div>
          <div class="right">
            <span class="right-text">￥</span>
            <span class="right-price">{{ data.lowPrice / 100 }}</span>
            <span class="right-text">起</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import http from "@/util/http.js";
import betterScroll from 'better-scroll'
export default {
  data () {
    return {
      // cinemasList: [],
      height: '0px'
    }
  },
  mounted () {
    // console.log(this.$refs.navbar.$el.offsetHeight)
    // 动态计算可视窗口高度
    this.height =
      document.documentElement.clientHeight - this.$refs.navbar.$el.offsetHeight -
      document.querySelector('footer').offsetHeight +
      'px'

    // 分发
    if (this.$store.state.cityListData.length === 0) {
      this.$store.dispatch('getComponent', this.$store.state.cityId).then
      (res => {
        // console.log('数据完事')
        this.$nextTick(() => {
          new betterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      this.$nextTick(() => {
        new betterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }

    // http({
    //   url: `gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=3095876`,
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    //   // console.log(res.data.data.cinemas)
    //   this.cinemasList = res.data.data.cinemas;
    // this.$nextTick(() => {
    //   new betterScroll(".box", {
    //     scrollbar: {
    //       fade: true,
    //     },
    //   });
    // });
    // });
  },
  methods: {
    handelClick () {
      this.$router.push('/city')
      this.$store.commit('clearCityListData')
    },
    handelRightClick () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
.left-name {
  font-size: 15px;
  color: #191a1b;
}
.left-address {
  font-size: 12px;
  color: #797d82;
  margin-top: 5px;
  width: 11.8333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right-text {
  font-size: 11px;
  color: #ff5f16;
}
.right-price {
  font-size: 15px;
  color: #ff5f16;
}
.box {
  height: 300px;
  overflow: hidden;
  position: relative;
}
</style>
