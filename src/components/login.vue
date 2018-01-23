<template>
  <div id="app">

    <div class="demo-input-suffix">
      <p>用户名<el-input  v-model="t1" placeholder="请输入内容"/></p>
      <p>密码<el-input v-model="t2" placeholder="请输入内容"/></p>
      <p><el-button @click="login($data.t1,$data.t2,$data)" type="success">登录</el-button>
        <el-button @click="logout()" type="success">注销</el-button>
        <el-button @click="getSession()" type="success">查看TOKEN</el-button>
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
      login(p1,p2,dataplace){
        console.log("login--------")
        var params = new URLSearchParams();
        params.append("username",p1);
        params.append("password",p2);
        params.append("userType",1)
        axios.post("http://localhost:8082/project/auth/login",params, {
        }).then(function (response) {
          dataplace.auth = response.data.data;
          sessionStorage.setItem("authKey",response.data.data);
          console.log(sessionStorage.getItem("authKey"));
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
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    width: 20%;
  }
</style>
