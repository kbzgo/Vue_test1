<template>
  <div id="app" align="center">
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/questionmain">查看题目</router-link>
      <router-link to="/questiondbmain">查看题库</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  #app{
    width: 100%;
  }
</style>
