<template>
    <div>
        login
        <button @click="submit">登录</button>
    </div>
</template>
<script>

export default {
  methods: {
    submit () {
      // 在localStorage中存储key值为token value为 aaa的数据
      localStorage.setItem('token', 'aaa')

      // 1.获取query字段

      console.log(this.$route)
      // 2.跳转到当时想要跳的页面去
      // 点击登录后跳转到的路径
      this.$router.push(this.$route.query.redirect)
    }
  }
}
</script>
<style scoped>
div{
    height: 16.6667rem;
    background: pink;
    text-align: center;
}
</style>
