import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  // state里面的状态全部持久化
  plugins: [createPersistedState()],
  // 指定状态持久化
  // plugins: [createPersistedState({
  //     reducer(state){
  //         return {
  //             cityId:state.cityId,
  //             cityName:state.cityName
  //         }
  //     }
  // })],
  // 公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    cityListData: [],
    isTarbarShow: true
  },
  // 支持同步和异步
  actions: {
    getComponent (store, cityId) {
      return http({
        // url: `gateway?cityId=${cityId}&ticketFlag=1&k=3095876`,
        url: `gateway?cityId=${store.state.cityId}&ticketFlag=1&k=3095876`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        // console.log(res.data.data.cinemas)
        store.commit('handleCityData', res.data.data.cinemas)
      })
    }
  },
  // 同步
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    handleCityData (state, data) {
      state.cityListData = data
    },
    clearCityListData (state) {
      state.cityListData = []
    },
    show (state) {
      state.isTarbarShow = true
    },
    hiden (state) {
      state.isTarbarShow = false
    }
  }
})
