<template>
  <div id="app">
    <p><el-input type="textarea" :rows="2" v-model="questionTitle" placeholder="输入题干"/></p>
    <p><el-input type="textarea" :rows="2" v-model="questionDesc" placeholder="输入题目描述"/></p>
    <p>
      <el-select @change="showAddMethod($data.questionType,$data)" v-model="questionType" placeholder="题型">
        <el-option
          v-for="item in qType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </p>
    <p>
      <el-select v-model="questionCase" placeholder="难度">
        <el-option
          v-for="item in qCase"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </p>
    <p>
      <el-select v-model="questionDid" placeholder="题库">
        <el-option
          v-for="item in db"
          :key="item.dbCode"
          :label="item.dbName"
          :value="item.dbCode">
        </el-option>
      </el-select>
    </p>
    <!--如果选择的是判断题-->
    <div v-show="type2show">
      <el-select v-model="questionAnswer" placeholder="答案">
        <el-option
          v-for="item in qAnswer"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    <p><el-button @click="wantTo($data)" type="success" >提交题目</el-button></p>
    </div>

    <!--如果选择的是单选题-->
    <div v-show="type0show">
      <el-radio-group v-model="trueAnswer" >
        <div v-for="(item,index) in readyOptions" >
          <p>选项{{item.oName}}</p>
          <p><el-radio :label="readyOptions[index].oName"/></p>
          <p><el-input v-model="readyOptions[index].oDesc" placeholder="输入选项内容"/></p>
        </div>
      </el-radio-group>
        <p><el-button @click="deleteOption($data.count--,$data)" type="success" >减少选项</el-button></p>
        <p><el-button @click="addOption($data.count++,$data)" type="success" >添加选项</el-button></p>
        <p><el-button @click="wantTo($data)" type="success" >提交题目</el-button></p>
    </div>

    <!--如果选择的是多选题-->
    <div v-show="type1show">
      <el-checkbox-group v-model="trueAnswerMult">
        <div v-for="(item,index) in readyOptionsMult" >
          <p>选项{{item.oName}}</p>
          <p><el-checkbox :label="readyOptionsMult[index].oName"/></p>
          <p><el-input v-model="readyOptionsMult[index].oDesc" placeholder="输入选项内容"/></p>
        </div>
      </el-checkbox-group>
      <p><el-button @click="deleteOptionMult($data.countMult--,$data)" type="success" >减少选项</el-button></p>
      <p><el-button @click="addOptionMult($data.countMult++,$data)" type="success" >添加选项</el-button></p>
      <p><el-button @click="wantTo($data)" type="success" >提交题目</el-button></p>
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
        qType: [{
          value: '0',
          label: '单选题'
        }, {
          value: '1',
          label: '多选题'
        }, {
          value: '2',
          label: '判断题'
        }],
        qAnswer: [{
          value: '0',
          label: '正确'
        }, {
          value: '1',
          label: '错误'
        }],
        qCase: [{
          value: '0',
          label: '简单'
        }, {
          value: '1',
          label: '中等'
        }, {
          value: '2',
          label: '困难'
        }, {
          value: '3',
          label: '极度困难'
        }
        ],
        questionTitle : "",
        questionDesc : "",
        showAdd : false,
        questionCase : "",
        questionType : "",
        questionAnswer : "",
        questionDid : "",
        count : 4,
        countMult : 4,
        type2show : false,
        type0show : false,
        type1show : false,
        readyOptions : [
          { oName : "0" , oDesc: ""},
          { oName : "1" , oDesc: ""},
          { oName : "2" , oDesc: ""},
          { oName : "3" , oDesc: ""}
        ],
        readyOptionsMult : [
          { oName : "0" , oDesc: ""},
          { oName : "1" , oDesc: ""},
          { oName : "2" , oDesc: ""},
          { oName : "3" , oDesc: ""}
        ],
        trueAnswer : "",
        trueAnswerMult : [],
        totalName : "",
        numberName : "",
        totalDesc : "",
        numberDesc : "",
        totalNameMult : "",
        numberNameMult : "",
        totalDescMult : "",
        numberDescMult : "",
        MultFinalAnswer : "",
        db : []
      }
    },
    mounted(){
      this.$options.methods.getDb(this.$data);
    },
    methods:{
      getDb(dataplace){
        axios.get("http://localhost:8082/project/tmQuestionDb/findAllDbByPagination?&rows=1000&page=1", {
          headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
        }).then(function (response) {
          dataplace.db = response.data.rows;
          console.log(dataplace.db);
        })
      },
      showAddMethod(p1,dataplace){
        console.log(p1);
        console.log(p1 == "0");
        if(p1 == "0"){
          dataplace.type0show = true;
          dataplace.type1show = false;
          dataplace.type2show = false;
        }else if(p1 == "1"){
          dataplace.type0show = false;
          dataplace.type1show = true;
          dataplace.type2show = false;
        }else if(p1 == "2") {
          dataplace.type0show = false;
          dataplace.type1show = false;
          dataplace.type2show = true;
        }
      },
      //增加一个选项
      addOption(p1,dataplace){
        dataplace.readyOptions.push({ oName : ""+p1+"" , oDesc: ""});
        console.log(dataplace.readyOptions);
      },
      //减少一个选项
      deleteOption(p1,dataplace){
        dataplace.readyOptions.splice(p1-1);
        console.log(dataplace.readyOptions);
      },
      //增加一个选项
      addOptionMult(p1,dataplace){
        dataplace.readyOptionsMult.push({ oName : ""+p1+"" , oDesc: ""});
        console.log(dataplace.readyOptionsMult);
      },
      //减少一个选项
      deleteOptionMult(p1,dataplace){
        dataplace.readyOptionsMult.splice(p1-1);
        console.log(dataplace.readyOptionsMult);
      },
      //分解数组并提交
      wantTo(dataplace){
        dataplace.totalName = "";
        dataplace.numberName = "";
        dataplace.totalDesc ="";
        dataplace.numberDesc =""
        dataplace.totalNameMult = "";
        dataplace.numberNameMult = "";
        dataplace.totalDescMult ="";
        dataplace.numberDescMult ="";
        dataplace.MultFinalAnswer = "";
        if(sessionStorage.getItem("authKey") == null){
          alert("请先登录");
        }else{
          //如果是判断题
          if(dataplace.questionType == "2"){
            console.log(sessionStorage.getItem("authKey"));
            var params = new URLSearchParams();
            params.append("qTitle",dataplace.questionTitle);
            params.append("qType",dataplace.questionType);
            params.append("qDesc",dataplace.questionDesc);
            params.append("qCase",dataplace.questionCase);
            params.append("qAnswer",dataplace.questionAnswer);
            params.append("dId",dataplace.questionDid);
            params.append("fName","null");
            params.append("fPath","null");
            axios.post("http://localhost:8082/project/tmquestion/addQuestion",params, {
              headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
            }).then(function (response) {
              console.log(response.data.data);
              dataplace.question = response.data.data;
            })
          }//如果是选择题
          else if(dataplace.questionType == "0"){
            for (let i=0;i<dataplace.readyOptions.length;i++)
            {
              dataplace.totalName += dataplace.readyOptions[i].oName;
              dataplace.numberName += dataplace.readyOptions[i].oName.length+",";
            }
            for (let i=0;i<dataplace.readyOptions.length;i++)
            {
              dataplace.totalDesc += dataplace.readyOptions[i].oDesc;
              dataplace.numberDesc += dataplace.readyOptions[i].oDesc.length+",";
            }
            dataplace.numberName = dataplace.numberName.substr(0,dataplace.numberName.length-1);
            dataplace.numberDesc = dataplace.numberDesc.substr(0,dataplace.numberDesc.length-1);
            console.log(dataplace.totalName);
            console.log(dataplace.numberName);
            console.log(dataplace.totalDesc);
            console.log(dataplace.numberDesc);
            console.log(dataplace.trueAnswer);
            console.log(dataplace.questionDid);
            var params = new URLSearchParams();
            params.append("qTitle",dataplace.questionTitle);
            params.append("qType",dataplace.questionType);
            params.append("qDesc",dataplace.questionDesc);
            params.append("qCase",dataplace.questionCase);
            params.append("qAnswer",dataplace.trueAnswer);
            params.append("dId",dataplace.questionDid);
            params.append("fName","null");
            params.append("fPath","null");
            params.append("options",dataplace.totalName);
            params.append("optionsLength",dataplace.numberName);
            params.append("odescs",dataplace.totalDesc);
            params.append("odescsLength",dataplace.numberDesc);
            axios.post("http://localhost:8082/project/tmquestion/addQuestionAndOptions",params, {
              headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
            }).then(function (response) {
              console.log(response.data.data);
              dataplace.question = response.data.data;
            })
          }//如果是多选题
          else if(dataplace.questionType == "1"){
            for (let i=0;i<dataplace.readyOptionsMult.length;i++)
            {
              dataplace.totalNameMult += dataplace.readyOptionsMult[i].oName;
              dataplace.numberNameMult += dataplace.readyOptionsMult[i].oName.length+",";
            }
            for (let i=0;i<dataplace.readyOptionsMult.length;i++)
            {
              dataplace.totalDescMult += dataplace.readyOptionsMult[i].oDesc;
              dataplace.numberDescMult += dataplace.readyOptionsMult[i].oDesc.length+",";
            }
            for (let i=0;i<dataplace.trueAnswerMult.length;i++)
            {
              dataplace.MultFinalAnswer += dataplace.trueAnswerMult[i]+",";
            }

            dataplace.MultFinalAnswer = dataplace.MultFinalAnswer.substr(0,dataplace.MultFinalAnswer.length-1);
            dataplace.numberNameMult = dataplace.numberNameMult.substr(0,dataplace.numberNameMult.length-1);
            dataplace.numberDescMult = dataplace.numberDescMult.substr(0,dataplace.numberDescMult.length-1);
            console.log(dataplace.totalNameMult);
            console.log(dataplace.numberNameMult);
            console.log(dataplace.totalDescMult);
            console.log(dataplace.numberDescMult);
            console.log(dataplace.trueAnswerMult);
            var params = new URLSearchParams();
            params.append("qTitle",dataplace.questionTitle);
            params.append("qType",dataplace.questionType);
            params.append("qDesc",dataplace.questionDesc);
            params.append("qCase",dataplace.questionCase);
            params.append("qAnswer",dataplace.MultFinalAnswer);
            params.append("dId",dataplace.questionDid);
            params.append("fName","null");
            params.append("fPath","null");
            params.append("options",dataplace.totalNameMult);
            params.append("optionsLength",dataplace.numberNameMult);
            params.append("odescs",dataplace.totalDescMult);
            params.append("odescsLength",dataplace.numberDescMult);
            axios.post("http://localhost:8082/project/tmquestion/addQuestionAndOptions",params, {
              headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
            }).then(function (response) {
              console.log(response.data.data);
              dataplace.question = response.data.data;
            })
          }
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
