<template>
    <div>
        <film-swiper :key="datalist.length">
            <film-swiper-item v-for="data in datalist" :key="data.id" class="swiperitem">
                <img :src="data.imgUrl"/>
            </film-swiper-item>
        </film-swiper>
        <film-header class="sticky"></film-header>
        <router-view></router-view>
    </div>
</template>
<script>
import filmSwiper from '@/components/films/FilmSwiper.vue'
import filmSwiperItem from '@/components/films/FilmSwiperItem.vue'
import axios from 'axios'
import filmHeader from '@/components/films/FilmHeader.vue'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('/banner.json')
      .then(res => {
        console.log(res.data)
        this.datalist = res.data.banner
      })
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader
  }
}
</script>
<style scoped>
.sticky{
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
}
</style>
