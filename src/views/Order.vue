<template>
    <div>
        <p>订单详情</p>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    axios.get('/api/mmdb/movie/v3/list/hot.json?ct=%E9%83%BD%E6%B1%9F%E5%A0%B0&ci=576&channelId=4').then(res => {
      console.log(res.data)
    })
  }
}
</script>
