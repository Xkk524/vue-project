<template>
  <div class="city">
    <van-index-bar :index-list="computedCity" @select="handelChange">
      <div class="hot-city">
        <div class="city-index-title">热门城市</div>
        <ul class="city-index-detail">
          <li v-for="(hot, index) in hotCity" :key="index">
            {{ hot }}
          </li>
        </ul>
      </div>
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="item in data.list"
          :key="item.cityId"
          @click="handleClick(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http.js'
import { Toast } from 'vant'
import myMixin from '@/util/TarbarShow'
export default {
  mixins: [myMixin],
  data () {
    return {
      cityList: [],
      hotCity: []
    }
  },
  // 离开后显示
  // destroyed(){
  //   this.$store.commit('show')
  // },
  mounted () {
    // 进入就隐藏
    // this.$store.commit('hiden')
    http({
      url: 'gateway?k=4727773',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      // console.log(res.data.data.cities)
      this.cityList = this.renderCity(res.data.data.cities)
      for (let i = 0; i < res.data.data.cities.length; i++) {
        if (res.data.data.cities[i].isHot === 1) {
          this.hotCity.push(res.data.data.cities[i].name)
        }
      }
      // console.log(this.hotCity)
    })
  },
  computed: {
    computedCity () {
      return this.cityList.map((item) => item.type)
    }
  },
  methods: {
    handelChange (data) {
      // console.log(data)
      Toast({
        message: data,
        // 设置展示时间为 0.5秒
        duration: 500
      })
    },
    renderCity (list) {
      // console.log(list)
      const letterList = []
      const cityList = []
      // 生成26个英文字母
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }

      //   console.log(letterList)
      // 遍历生成的26个英文字母组成的数组，letter是数组中的每一项
      letterList.forEach((letter) => {
        // 过滤从后端拿到的数据，通过每一项数据中的pinyin属性来进行过滤，并放在一个新的数组中
        const newList = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        //  console.log(newList)
        // 判断数组的长度是否大于0，以及往cityList数组中添加类型为'A','B,'C'....list为过滤后的数组内容
        newList.length > 0 &&
          cityList.push({
            type: letter,
            list: newList
          })
      })
      return cityList
    },
    handleClick (item) {
      // 传统多页面传递参数
      // location.href = '/cinemas?city='+item.name
      // cookie localStorage

      // 单页面方案中
      // 1.中间人模式
      // 2. bus事件总线 $on ,$emit
      // console.log(this.$store.state.cityId)
      console.log(item)

      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
.city-index-title {
  font-size: 13px;
  color: #797d82;
  margin-bottom: 10px;
  margin-left: 10px;
}
.city-index-detail {
  display: flex;
  li {
    flex: 1;
    text-align: center;
    height: 1.6667rem;
    background-color: #f4f4f4;
    line-height: 1.6667rem;
    border-radius: 4px;
    margin: 0 7.5px;
    font-size: 14px;
    color: #191a1b;
  }
}
.van-toast--html,
.van-toast--text {
  min-width: 2.7778rem;
  min-height: 2.7778rem;
  font-size: 18px;
}
</style>
