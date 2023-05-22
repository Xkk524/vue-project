<template>
    <div class="swiper" >
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
// import Swiper from 'swiper/bundle'
// import 'swiper/swiper-bundle.css'
export default {
  mounted () {
    new Swiper('.swiper', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
  }
}
</script>
