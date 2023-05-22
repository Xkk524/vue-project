<template>
    <ul>
        <router-link to="/films/nowingPlay" custom v-slot="{navigate,isActive}">
            <li @click="navigate" :class="isActive?'xiaokaiactive':''">正在热映</li>
        </router-link>
        <router-link to="/films/comingSoon" custom v-slot="{navigate,isActive}">
            <li @click="navigate" :class="isActive?'xiaokaiactive':''">即将上映</li>
        </router-link>
    </ul>
</template>
<style lang="scss" scoped>
    ul{
        list-style: none;
        display: flex;
        height: 1.1111rem;
        line-height: 1.1111rem;
        li{
            flex: 1;
            text-align: center;
        }
    }
    .xiaokaiactive{
        background: skyblue;
        color: rgb(228, 14, 221);
    }
</style>
