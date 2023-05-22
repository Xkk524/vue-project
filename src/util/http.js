// 1-对于数据请求的封装--函数写法
// import axios from "axios"
// // 对于请求正在热映列表数据的axios进行封装
// function httpList(){
//    return axios({
//         url:'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=2715946',
//         headers:{
//           'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16787599621476549626822657","bc":"110100"}',
//           'X-Host': 'mall.film-ticket.film.list'
//         }
//     })
// }
// // 对于请求详细数据的axios进行封装
// function httpDetail(params){
//   return  axios({
//         url:`https://m.maizuo.com/gateway?filmId=${params}&k=7989605`,
//         headers:{
//         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16787599621476549626822657","bc":"310100"}',
//         'X-Host': 'mall.film-ticket.film.info'
//         }
//     })
// }
// export default {
//     httpList,
//     httpDetail
// }

import axios from 'axios'
import { Toast } from 'vant'

// 2-对于数据请求的封装--axios自带
const http = axios.create({
  baseURL: 'https://m.maizuo.com/',
  timeout: 10000,
  headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16787599621476549626822657","bc":"110100"}' }
})

http.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    // 展示时长(ms)，值为 0 时，toast 不会消失
    duration: 0
  })
  return config
}, function (error) {
  return Promise.reject(error)
})
http.interceptors.response.use(function (response) {
  // 清除加载
  Toast.clear()
  return response
}, function (error) {
  // 响应失败也要清除
  Toast.clear()
  return Promise.reject(error)
})
export default http
