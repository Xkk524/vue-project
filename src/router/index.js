import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
import Film from '@/views/Film.vue'
import Nowingplay from '@/views/films/Nowingplay.vue'
import Comingsoon from '@/views/films/Comingsoon.vue'
// import Center from '@/views/Center.vue'
import Order from '@/views/Order.vue'
import Setting from '@/views/Setting.vue'
import Blance from '@/views/Blance.vue'
// import Cinema from '@/views/Cinema.vue'
import Search from '@/views/Search.vue'
import City from '@/views/City.vue'
import Detail from '@/views/Detail.vue'
import Login from '@/views/Login.vue'
import Store from '@/store/index'

Vue.use(VueRouter) // 定义路由，定义之后会全局注册两个组件 router-view router-link

// 配置表(映射表) 路由  ，这里是一个数组 每一个链接都是一个对象
// 创建路由对象
const routes = [
  {
    // 链接路径
    path: '/films',
    // 对应的组件模板
    component: Film,
    // 嵌套路由
    children: [
      {
        path: '/films/nowingPlay',
        component: Nowingplay
      },
      {
        path: '/films/comingSoon',
        component: Comingsoon
        // meta:{
        //   isShow: true
        // }
      },
      // 嵌套路由重定向
      {
        path: '/films',
        redirect: '/films/nowingPlay'
      }
    ]
  },
  {
    path: '/detail/:id', // 配置动态二级路由 : 冒号必备 id为自定义名字
    name: 'filmsDetail', // 自定义路由的名字
    component: Detail
    // 通过路由拦截底部选项栏的显示隐藏
    // meta:{
    //   isShow: true
    // }
  },
  {
    path: '/center',
    component: () => import('@/views/Center.vue'), // 路由懒加载
    meta: {
      isRunning: true // isRunning 是随便设置的，非标准
    }
    // 路由独享拦截(局部路由拦截)
    // beforeEnter:(to,from,next)=>{
    //   if(localStorage.getItem('token')){
    //     next()
    //   }else{
    //     next({
    //       path: '/login',
    //       query:{redirect: to.fullPath}
    //     })
    //   }
    // }
  },
  // 订单路径
  {
    path: '/center/order',
    component: Order
  },
  // 设置路径
  {
    path: '/center/setting',
    component: Setting
  },
  // 余额路径
  {
    path: '/center/blance',
    component: Blance
  },
  {
    path: '/cinemas',
    component: () => import('@/views/Cinema.vue') // 路由懒加载
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/city',
    component: City
  },
  // 有嵌套关系，但是平级显示
  {
    path: '/login',
    component: Login
  },
  // 重定向
  {
    // 当url的地址以/结尾时，就重定向到以/films结尾的url地址中
    path: '/',
    redirect: '/films'
  },
  {
    // * 是通配符
    path: '*',
    redirect: '/films'
  }
]
const router = new VueRouter({
  // 将vue-router 从默认的hash模式改为history模式
  // mode: 'hash',
  // 配置路由与组件之间的应用关系
  routes
})
// router.beforeEach((to,from,next)=>{
// if(to.meta.isShow){
//   Store.commit('show')
// }else{
//   Store.commit('hiden')
// }
// })
// 全局定义路由拦截
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 通过路由拦截底部选项栏的显示隐藏
  // if(to.meta.isShow){
  //   Store.commit('hiden')
  // }else{
  //   Store.commit('show')
  // }
  // 判断将要跳转的路由对象的 meta 是否存在 isRunning 属性，如果存在，则进行以下处理：
  if (to.meta.isRunning) {
    // 判断本地存储中是否有token，如果为真就进入到“我的”页面中，否则就跳转到login页面
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        // query 属性的值是一个对象，其中含有一个键值对：redirect：to.fullPath。其中，to 是即将要跳转的路由对象，fullPath 是该路由的完整路径。
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

// 将router对象传入Vue实例
export default router
