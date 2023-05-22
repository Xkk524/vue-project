<template>
    <el-container style="height: 100%;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="[]">
        <el-submenu :index="data.id +'' " v-for="data in dataList" :key="data.id">
          <template slot="title"><i class="el-icon-message"></i>{{data.title}}</template>
          <el-menu-item-group >
            <el-menu-item :index="item.id + '' " v-for="item in data.child" :key="item.id">{{ item.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{name}}</span>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default {
  data () {
    return {
      name: 'xiaokai',
      dataList: [
        {
          id: 1,
          title: '用户',
          child: [
            {
              id: 2,
              title: '用户列表'
            },
            {
              id: 3,
              title: '用户权限'
            }
          ]
        },
        {
          id: 4,
          title: '管理员',
          child: [
            {
              id: 5,
              title: '管理员列表'
            },
            {
              id: 6,
              title: '管理员权限'
            }
          ]
        }
      ],
      tableData: [
        {
          name: '张三',
          address: '北京',
          date: '2023-4-14'
        },
        {
          name: '李四',
          address: '上海',
          date: '2023-4-13'
        },
        {
          name: '王五',
          address: '四川',
          date: '2023-4-15'
        }
      ]
    }
  }
}
</script>

<style>
*{
    padding: 0;
    margin: 0;
}
html,body{
    height: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
