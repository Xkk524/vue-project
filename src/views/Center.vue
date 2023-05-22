<template>
    <div>
        <router-link to="/center/order" custom v-slot="{navigate}">
            <li @click="navigate">订单</li>
        </router-link>
        <router-link to="/center/setting" custom v-slot="{navigate}">
            <li @click="navigate">设置</li>
        </router-link>
        <router-link to="/center/blance" custom v-slot="{navigate}">
            <li @click="navigate">余额</li>
        </router-link>
        <van-button type="primary">主要按钮</van-button>
    </div>

</template>
<script>

export default {

}
</script>
