<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="输入影城名称"
      @search="onSearch"
      @cancel="onCancel"
    />
    <ul v-if="value">
        <li v-for="data in computedList" :key="data.cinemaId">
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

</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {},
    onCancel () {
      this.$router.back()
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cityListData.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) ||
           item.address.toUpperCase().includes(this.value.toUpperCase()))
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
</style>
