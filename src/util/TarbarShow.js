const myMixin = {
  created () {
    this.$store.commit('hiden')
  },
  destroyed () {
    this.$store.commit('show')
  }
}

export default myMixin
