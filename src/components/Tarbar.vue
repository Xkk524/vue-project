<template>
   <footer>
        <ul>
            <!-- vue-router(3.x包括3.x之前的版本使用tag自定义标签名) 声明式导航 -->
            <!-- <router-link to="/films" active-class="tarbaractive" tag="li">电影</router-link>
            <router-link to="/cinemas" active-class="tarbaractive" tag="li">影院</router-link>
            <router-link to="/center" active-class="tarbaractive" tag="li">我的</router-link> -->

            <!-- vue-router(4.x包括4.x之后自定义标签名) 声明式导航 -->
            <router-link to="/films" custom v-slot="{navigate,isActive}">
                <li @click="navigate" :class="isActive?'tarbaractive':''">
                    <i class="iconfont icon-dianying"></i>
                    <span>电影</span>
                </li>
            </router-link>
            <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
                <li @click="navigate" :class="isActive?'tarbaractive':''">
                    <i class="iconfont icon-yingyuan"></i>
                    <span>影院</span>
                </li>
            </router-link>
            <router-link to="/center" custom v-slot="{navigate,isActive}">
                <li @click="navigate" :class="isActive?'tarbaractive':''">
                    <i class="iconfont icon-wode"></i>
                    <span>我的</span>
                </li>
            </router-link>
        </ul>
   </footer>
</template>
<script>
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'
export default {

}
</script>
<style lang="scss" scoped>
footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 100;
    ul{
        display: flex;
        height: 2.7778rem;
        li{
            flex: 1;
            text-align: center;
            line-height: 1.3889rem;
            display: flex;
            flex-direction: column;
            i{
                font-size: 20px;
            }
            span{
                font-size: 16px;
            }
        }
    }
}
.tarbaractive{
    color: orangered;
  }
</style>
