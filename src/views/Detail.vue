<template>
    <div v-if="filmsInfo">
        <detail-header v-scroll="80">
          {{ filmsInfo.name }}
        </detail-header>
        <div>
            <span class="iconfont icon-fanhui" @click="back"></span>
        </div>
          <div class="poster" :style="{backgroundImage:'url('+filmsInfo.poster+')'}"></div>
        <div class="content">
          <div class="content-name">
            <span>{{ filmsInfo.name }}</span>
            <span :class="filmsInfo.filmType.name?'item':'hidden'">{{ filmsInfo.filmType.name }}</span>
          </div>
          <div class="content-text">{{ filmsInfo.category }}</div>
          <div class="content-text">{{ filmsInfo.premiereAt | dateFilter }}上映</div>
          <div class="content-text">{{ filmsInfo.nation }} | {{ filmsInfo.runtime }}分钟</div>
          <div :class="hidden?'filmDetail':'filmDetailShow'">{{ filmsInfo.synopsis }}</div>
          <div class="iconfont" @click="hidden = !hidden" :class="hidden?'icon-xiajiantou':'icon-shangjiantou'"></div>
        </div>
        <div class="actors" >
          <div>演职人员</div>
          <detail-swiper :perview="3" name="actors">
            <detail-swiper-item v-for="data in filmsInfo.actors" :key="data.name">
              <div class="avatar" :style="{backgroundImage:'url('+data.avatarAddress+')'}"></div>
              <div class="actors-name">{{ data.name }}</div>
              <div class="actors-role">{{ data.role }}</div>
            </detail-swiper-item>
          </detail-swiper>
        </div>
        <div class="photos">
          <div>剧照</div>
          <detail-swiper :perview="2" name="photos">
            <detail-swiper-item v-for="(data,index) in filmsInfo.photos" :key="index">
              <div class="photos-img" :style="{backgroundImage:'url('+data+')'}" @click="handelPreview(index)"></div>
            </detail-swiper-item>
          </detail-swiper>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import { ImagePreview } from 'vant'
import Vue from 'vue'
// import axios from 'axios'
import '@/assets/iconfont/iconfont.css'
import http from '@/util/http'
import DetailSwiper from '@/components/detail/DetailSwiper.vue'
import DetailSwiperItem from '@/components/detail/DetailSwiperItem.vue'
import DetailHeader from '@/components/detail/DetailHeader.vue'
import myMixin from '@/util/TarbarShow'
Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (el, binding) {
    // console.log(el)
    el.style.display = 'none'
    window.onscroll = () => {
      // console.log("scroll")
      if (document.documentElement.scrollTop || document.body.scrollTop > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 解绑
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [myMixin],
  data () {
    return {
      filmsInfo: null,
      hidden: true
    }
  },
  components: {
    DetailSwiper,
    DetailSwiperItem,
    DetailHeader
  },
  methods: {
    back () {
      // 请求(返回)上一个记录路由
      // this.$router.back()
      this.$router.go(-1)
      // 请求下一个记录路由
      // this.$router.go(1)
    },
    handelPreview (index) {
      ImagePreview({
        images: this.filmsInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  // 在detail组件中，通过created或者mouted获取点击列表后传入的id值
  mounted () {
    console.log(this.$route)
    // 将拿到的id 通过axios发送请求给详情接口，拿到返回的值后渲染在页面上
    // axios({
    //   url:`https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=7989605`,
    //   headers:{
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16787599621476549626822657","bc":"310100"}',
    //     'X-Host': 'mall.film-ticket.film.info'
    //   }
    // }).then(res=>{
    //   console.log(res.data.data.film)
    // })
    // 1.函数式封装axios
    // http.httpDetail(this.$route.params.id).then(res=>{
    //   console.log(res.data.data.film)
    // })
    // 2.axios自带的封装
    http({
      url: `gateway?filmId=${this.$route.params.id}&k=7989605`,
      headers: { 'X-Host': 'mall.film-ticket.film.info' }
    }).then(res => {
      // console.log(res.data.data.film)
      this.filmsInfo = res.data.data.film
    })
  }
}
</script>
<style lang="scss" scoped>
.icon-fanhui{
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  background: wheat;
  position: fixed;
  top: 0;
}
.poster{
  width: 100%;
  height: 11.6667rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.content{
  padding: .8333rem;
  .content-text{
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
  }
  .iconfont{
    text-align: center;
  }
}
.item{
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
}
.filmDetail{
  margin-top: 10px;
  font-size: 13px;
  height: 30px;
  color: #797d82;
  line-height: 15px;
  overflow: hidden;
}
.filmDetailShow{
  margin-top: 10px;
  font-size: 13px;
  color: #797d82;
  line-height: 15px;
}
.hidden{
  overflow: hidden;
}
.actors{
  margin-top: 10px;
  background: #fff;
  padding: .8333rem;
  .avatar{
    width: 100%;
    height: 4.7222rem;
    background-position:center ;
    background-size:cover ;
  }
  .actors-name{
    text-align: center;
    font-size: 12px;
    color: #191a1b;
  }
  .actors-role{
    text-align: center;
    font-size: 10px;
    color: #797d82;
  }
}
.photos{
  margin-top: 10px;
  background: #fff;
  padding: 15px;
  .photos-img{
    width: 100%;
    height: 4.7222rem;
    background-position:center ;
    background-size:cover ;
  }
}
</style>
