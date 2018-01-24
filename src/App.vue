<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h1>题库管理系统</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">

        </div>
      </el-col>
    </el-row>

    <p><router-link to="/main">查询</router-link>&nbsp<router-link to="/login">登录</router-link></p>

    <router-view></router-view>
    <router-view name="a"></router-view>

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
        authIsExist : sessionStorage.getItem("authKey") == null
      }
    },

    methods:{
      logout(){
        sessionStorage.removeItem("authKey");
      },
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
    text-align: center;
  }

  .el-row {
    margin-bottom: 0px;
  }
  .el-row:last-child {
     margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    background-color: #f9fafc;
  }
</style>
