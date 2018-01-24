<template>
  <div id="app">

    <div class="demo-input-suffix">
      <p>用户名</p><p><el-input  v-model="t1" placeholder="输入用户名"/></p>
      <p>密码</p><p><el-input v-model="t2" placeholder="请输入密码"/></p>
      <p><el-button @click="login()" type="success">登录</el-button>
        <el-button @click="logout()" type="success">注销</el-button>
        <el-button @click="getSession()" type="success">查看</el-button>
      </p>
    </div>
  </div>
</template>

<script>
  import axios from "axios/lib/axios"
  import ElRadioGroup from "element-ui/packages/radio/src/radio-group";
  export default {
    name: "login",
    components: {ElRadioGroup},
    data() {
      return {
        t1 : "",
        t2 : "",
        t3 : "",
        auth : "",
        questionId : "",
        question : "",
        radio : ""
      }
    },
    methods:{
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
      login(){
        let that = this;
        var params = new URLSearchParams();
        params.append("username",that.$data.t1);
        params.append("password",that.$data.t2);
        params.append("userType",1);
        axios.post("http://localhost:8082/project/auth/login",params, {
        }).then(function (response) {
          that.$data.auth = response.data.data;
          sessionStorage.setItem("authKey",response.data.data);
          if(sessionStorage.getItem("authKey") != null && sessionStorage.getItem("authKey") != "undefined"){
            alert("登陆成功");
            that.$router.push({ path: '/main' });
          }else{
            alert("登录失败");
          }

        })
      },
      logout(){
        sessionStorage.removeItem("authKey");
      },
      getSession(){
        alert(sessionStorage.getItem("authKey"));
      }
    }
  }
</script>

<style scoped>
  #app {
    margin-top: 100px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    width: 20%;
  }
</style>
