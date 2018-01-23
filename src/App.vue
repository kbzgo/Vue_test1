<template>
  <div id="app">
    <h1>题库管理系统</h1>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/main">查询</router-link>
      <router-link to="/login">登录</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import ElRadioGroup from "element-ui/packages/radio/src/radio-group";

  export default {
    computed: {
      username () {
        // 我们很快就会看到 `params` 是什么
        return this.$route.params.username
      }
    },
    components: {ElRadioGroup},
    data() {
      return {

      }
    },
    methods:{
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    }
  }
</script>

<style>
  #app {
    margin: 0 auto;
    text-align: center;
    width : 100%;
  }
</style>
