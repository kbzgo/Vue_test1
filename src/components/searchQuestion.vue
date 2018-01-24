<template>
  <div id="app">
    <p><el-input v-model="questionId" placeholder="输入题目编号"/></p>
    <p><el-button @click="searchQuestion($data.questionId,$data)" type="success">查询题目</el-button>
    </p>
    <div>
      <p>{{question.qtitle}}</p>
      <div v-if="question.qtype == 0">
        <el-radio-group v-model="radio">
          <div v-for="option in question.optionList">
            <div v-if="question.qanswer == option.oname">
              <el-radio :label="option.oname">{{option.oname}}：{{option.odesc}}（正确答案）</el-radio>
            </div>
            <div v-else>
              <el-radio :label="option.oname">{{option.oname}}：{{option.odesc}}</el-radio>
            </div>
          </div>
        </el-radio-group>
      </div>
      <div v-else-if="question.qtype == 1">
        <div v-for="option in question.optionList"><el-radio v-model="radio" :label="option.oname">{{option.oname}}：{{option.odesc}}</el-radio></div>
      </div>
      <div v-else-if="question.qtype == 2">
        <el-radio-group v-model="radio">
          <div v-if="question.qanswer == 0">
            <el-radio :label="0"><div id="right" style="color:#F00">正确</div></el-radio>
            <el-radio :label="1">错误</el-radio>
          </div>
          <div v-else>
            <el-radio :label="0">正确</el-radio>
            <el-radio :label="1"><div id="right" style="color:#F00">错误</div></el-radio>
          </div>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios/lib/axios"
  import ElRadioGroup from "element-ui/packages/radio/src/radio-group";

  export default {
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
      searchQuestion(p1,dataplace){
        let that = this;
        if(sessionStorage.getItem("authKey") == null){
          alert("请先登录");
          that.$router.push({ path: '/main' });
        }else{
          axios.get("http://localhost:8082/project/tmquestion/detailQuestion/"+p1, {
            headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
          }).then(function (response) {
            console.log(response.data.data);
            dataplace.question = response.data.data;
          })
        }
      }
    }
  }
  let a=(sessionStorage.getItem("authKey")!=''&&sessionStorage.getItem("authKey")!=undefined&&sessionStorage.getItem("authKey")!=null)?sessionStorage.getItem("authKey"):localStorage.getItem("authKey")
  axios.defaults.headers.common['Authorization']="Bearer "+a;
</script>

<style scoped>
  #app{
    width: 20%;
  }
  #right{
  ;
  }
</style>
