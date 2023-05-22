<template>
    <div class="swiper" :class="name">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    perview: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'swiper'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.perview,
      spaceBetween: 15,
      freeMode: true
    })
  }
}
</script>
