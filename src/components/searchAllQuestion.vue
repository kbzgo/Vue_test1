<template>
  <div id="app">
    <el-table :data="questions" border style="width: 100%">
      <el-table-column fixed prop="qtitle" label="题干" width="150">
      </el-table-column>
      <el-table-column prop="qtype" label="题型" width="120">
      </el-table-column>
      <el-table-column prop="qdesc" label="描述" width="120">
      </el-table-column>
      <el-table-column prop="updateDate" label="上传时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row,$data)" type="text" size="small">查看</el-button>
          <el-button @click="showUpdate(scope.row,$data)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteQuestion(scope.row,$data)" type="text" size="small">停用</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!---------------------------------------------显示选择题Dialog框--------------------------------------------------->


    <el-dialog
      title="题目"
      :visible.sync="detailDialogShow0"
      width="50%">
      <h2>{{detail.qtitle}}</h2>
      <el-radio-group v-model="trueAnswer" >
        <div v-for="(item,index) in detail.optionList" >
          <p><el-radio :label="detail.optionList[index].odesc" disabled />
          </p>
        </div>
      </el-radio-group>
      <p>题目描述：{{detail.qdesc}}</p>
      <p>题目难度：{{detail.qcase}}</p>
    </el-dialog>


    <!---------------------------------------------显示多选题Dialog框--------------------------------------------------->


    <el-dialog
      title="题目"
      :visible.sync="detailDialogShow1"
      width="50%">
      <h2>{{detail.qtitle}}</h2>
      <el-checkbox-group v-model="trueAnswerMult" >
        <div v-for="(item,index) in detail.optionList" >
          <p><el-checkbox :label="detail.optionList[index].odesc" disabled />
          </p>
        </div>
      </el-checkbox-group>
      <p>题目描述：{{detail.qdesc}}</p>
      <p>题目难度：{{detail.qcase}}</p>
    </el-dialog>


    <!---------------------------------------------显示判断题Dialog框--------------------------------------------------->


    <el-dialog
      title="题目"
      :visible.sync="detailDialogShow2"
      width="50%">
      <h2>{{detail.qtitle}}</h2>
      <div v-if="detail.qanswer == 0">
        <h2>正确</h2>
      </div>
      <div v-if="detail.qanswer == 1">
        <h2>错误</h2>
      </div>
      <p>题目描述：{{detail.qdesc}}</p>
      <p>题目难度：{{detail.qcase}}</p>
    </el-dialog>


    <!---------------------------------------------修改判断题Dialog框--------------------------------------------------->


    <el-dialog
      title="修改"
      :visible.sync="updateDialogShowType2"
      :before-close="handleClose"
      width="50%">
      <p><el-input type="textarea" :rows="2" v-model="questionTitle" placeholder="输入题干"/></p>
      <p><el-input type="textarea" :rows="2" v-model="questionDesc" placeholder="输入题目描述"/></p>
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
      <el-select v-model="questionAnswer" placeholder="答案">
        <el-option
          v-for="item in qAnswer"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p><el-button @click="updateDialogShowType2 = false" type="success" >放弃修改</el-button></p>
      <p><el-button @click="wantTo($data,businessId)" type="success" >提交修改</el-button></p>
    </el-dialog>


    <!---------------------------------------------修改多选题Dialog框--------------------------------------------------->


    <el-dialog
      title="修改"
      :visible.sync="updateDialogShowType1"
      :before-close="handleClose"
      width="50%">
      <p><el-input type="textarea" :rows="2" v-model="questionTitle" placeholder="输入题干"/></p>
      <p><el-input type="textarea" :rows="2" v-model="questionDesc" placeholder="输入题目描述"/></p>
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
      <el-checkbox-group v-model="trueAnswerMult">
        <div v-for="(item,index) in readyOptionsMult" >
          <p>选项{{item.oName}}</p>
          <p><el-checkbox :label="readyOptionsMult[index].oname"/></p>
          <p><el-input v-model="readyOptionsMult[index].odesc" placeholder="输入选项内容"/></p>
        </div>
      </el-checkbox-group>
      <p><el-button @click="deleteOption($data.count--,$data)" type="success" >减少选项</el-button></p>
      <p><el-button @click="addOption($data.count++,$data)" type="success" >添加选项</el-button></p>
      <p><el-button @click="updateDialogShowType1 = false" type="success" >放弃修改</el-button></p>
      <p><el-button @click="wantTo($data,businessId)" type="success" >提交修改</el-button></p>
    </el-dialog>


    <!---------------------------------------------修改单选题Dialog框--------------------------------------------------->


    <el-dialog
      title="修改"
      :visible.sync="updateDialogShowType0"
      width="50%"
      :before-close="handleClose"
      >
      <p><el-input type="textarea" :rows="2" v-model="questionTitle" placeholder="输入题干"/></p>
      <p><el-input type="textarea" :rows="2" v-model="questionDesc" placeholder="输入题目描述"/></p>
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
      <el-radio-group v-model="trueAnswer" >
        <div v-for="(item,index) in readyOptions" >
          <p>选项{{item.oname}}</p>
          <p><el-radio :label="readyOptions[index].oname"/></p>
          <p><el-input v-model="readyOptions[index].odesc" placeholder="输入选项内容"/></p>
        </div>
      </el-radio-group>
      <p><el-button @click="deleteOption($data.count--,$data)" type="success" >减少选项</el-button></p>
      <p><el-button @click="addOption($data.count++,$data)" type="success" >添加选项</el-button></p>
      <p><el-button @click="updateDialogShowType0 = false" type="success" >放弃修改</el-button></p>
      <p><el-button @click="wantTo($data,businessId)" type="success" >提交修改</el-button></p>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios/lib/axios"
  import ElRadioGroup from "element-ui/packages/radio/src/radio-group";

  export default {
    components: {ElRadioGroup},
    data() {
      return {
        questionTitle : "",
        questionDesc : "",
        questionCase : "",
        questionType : "",
        questionAnswer : "",
        questionDid : "",
        count : 4,
        countMult : 4,
        readyOptions : [
          { oname : "0" , odesc: ""},
          { oname : "1" , odesc: ""},
          { oname : "2" , odesc: ""},
          { oname : "3" , odesc: ""}
        ],
        readyOptionsMult : [
          { oname : "0" , odesc: ""},
          { oname : "1" , odesc: ""},
          { oname : "2" , odesc: ""},
          { oname : "3" , odesc: ""}
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
        questions : [],
        radio : "",
        detailDialogShow0 : false,
        detailDialogShow1 : false,
        detailDialogShow2 : false,
        updateDialogShowType0 : false,
        updateDialogShowType1 : false,
        updateDialogShowType2 : false,
        t2 : "",
        detail : "",
        StaticDid : "",
        db : [],
        businessId : "",
        pp : []
      }
    },
    mounted(){
      let that = this;
      that.$options.methods.searchAllQuestion(that.$route.params.id,that.$data);
      that.StaticDid = that.$route.params.id;
      this.$options.methods.getDb(this.$data);
    },
    methods:{
      //增加一个选项
      addOption(p1,dataplace){
        dataplace.readyOptions.push({ oname : ""+p1+"" , odesc: ""});
        console.log(dataplace.readyOptions);
      },
      //减少一个选项
      deleteOption(p1,dataplace){
        dataplace.readyOptions.splice(p1-1);
        console.log(dataplace.readyOptions);
      },
      //增加一个选项
      addOptionMult(p1,dataplace){
        dataplace.readyOptionsMult.push({ oname : ""+p1+"" , odesc: ""});
        console.log(dataplace.readyOptionsMult);
      },
      //减少一个选项
      deleteOptionMult(p1,dataplace){
        dataplace.readyOptionsMult.splice(p1-1);
        console.log(dataplace.readyOptionsMult);
      },
      //获取题库
      getDb(dataplace){
        axios.get("http://localhost:8082/project/tmQuestionDb/findAllDbByPagination?&rows=1000&page=1", {
          headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
        }).then(function (response) {
          dataplace.db = response.data.rows;
          console.log(dataplace.db);
        })
      },
      searchAllQuestion(DbCode,dataplace){
        if(sessionStorage.getItem("authKey") == null){
          alert("请先登录");
          this.$router.push({ path: '/login' });
        }else{
          axios.get("http://localhost:8082/project/tmquestion/queryTmQuestionByPagination?rows=10&page=1&dId="+DbCode,{
            headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
          }).then(function (response) {
            for(let i=0;i<response.data.rows.length;i++){
              console.log(response.data.rows[i].qtype);
              if(response.data.rows[i].qtype == "0"){
                response.data.rows[i].qtype = "单选题";
              }
              if(response.data.rows[i].qtype == "1"){
                response.data.rows[i].qtype = "多选题";
              }
              if(response.data.rows[i].qtype == "2"){
                response.data.rows[i].qtype = "判断题";
              }
            }
            console.log(response);
            dataplace.questions = response.data.rows;
          })
        }
      },
      showDetail(p1,dataplace){
        console.log(p1);
        //选择题细节显示
        if(p1.qtype == "单选题"){
          dataplace.detailDialogShow0 = true;
          dataplace.detail = p1;
          dataplace.trueAnswer = dataplace.detail.optionList[p1.qanswer].odesc;
          console.log(dataplace.trueAnswer);
        }
        //多选题细节显示
        if(p1.qtype == "多选题"){
          dataplace.detailDialogShow1 = true;
          dataplace.detail = p1;
          console.log(p1.qanswer);
          for(let i=0;i<p1.qanswer.split(",").length;i++){
            dataplace.trueAnswerMult.push(dataplace.detail.optionList[p1.qanswer.split(",")[i]].odesc);
          }
          console.log(dataplace.trueAnswerMult);
        }
        //判断题细节显示
        if(p1.qtype == "判断题"){
          dataplace.detailDialogShow2 = true;
          dataplace.detail = p1;
          console.log(p1.qanswer);
        }
      },
      showUpdate(p1,dataplace){
        console.log(p1.qtype);
        if(p1.qtype == "单选题"){
          console.log(p1);
          dataplace.updateDialogShowType0 = true;
          dataplace.questionTitle = p1.qtitle;
          dataplace.questionDesc = p1.qdesc;
          dataplace.questionCase = p1.qcase;
          dataplace.questionDid = p1.did;
          dataplace.readyOptions = p1.optionList;
          dataplace.trueAnswer = p1.qanswer;
          dataplace.businessId = p1.businessId;
          dataplace.questionType = "0";
          console.log(dataplace.readyOptions);
        }
        if(p1.qtype == "多选题"){
          console.log(p1);
          dataplace.updateDialogShowType1 = true;
          dataplace.questionTitle = p1.qtitle;
          dataplace.questionDesc = p1.qdesc;
          dataplace.questionCase = p1.qcase;
          dataplace.questionDid = p1.did;
          dataplace.readyOptionsMult = p1.optionList;
          dataplace.trueAnswerMult = p1.qanswer.split(",");
          dataplace.businessId = p1.businessId;
          dataplace.questionType = "1";
          console.log(dataplace.readyOptions);
        }
        if(p1.qtype == "判断题"){
          console.log(p1);
          dataplace.updateDialogShowType2 = true;
          dataplace.questionTitle = p1.qtitle;
          dataplace.questionDesc = p1.qdesc;
          dataplace.questionCase = p1.qcase;
          dataplace.questionDid = p1.did;
          dataplace.questionAnswer = p1.qanswer;
          dataplace.businessId = p1.businessId;
          dataplace.questionType = "2";
          console.log(dataplace.readyOptions);
        }
      },
      showAnswer(){
        console.log(this.$data.trueAnswerMult);
      },
      deleteQuestion(p1,dataplace){
        let that = this;
        axios.delete("http://localhost:8082/project/tmquestion/deleteQuestion/"+p1.businessId,{
          headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
        }).then(function (response) {
          console.log(response);
          that.$options.methods.searchAllQuestion(dataplace.StaticDid,dataplace);
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //分解数组并提交
      wantTo(dataplace,bid){
        let that1 = this;
        console.log(dataplace.questionType)
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
            axios.put("http://localhost:8082/project/tmquestion/updateQuestion/"+bid,params, {
              headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
            }).then(function (response) {
              console.log(response.data.data);
              dataplace.updateDialogShowType2 = false;
              that1.$options.methods.searchAllQuestion(that1.$route.params.id,that1.$data);
            })
          }//如果是选择题
          else if(dataplace.questionType == "0"){
            for (let i=0;i<dataplace.readyOptions.length;i++)
            {
              dataplace.totalName += dataplace.readyOptions[i].oname;
              dataplace.numberName += dataplace.readyOptions[i].oname.length+",";
            }
            for (let i=0;i<dataplace.readyOptions.length;i++)
            {
              dataplace.totalDesc += dataplace.readyOptions[i].odesc;
              dataplace.numberDesc += dataplace.readyOptions[i].odesc.length+",";
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
            axios.put("http://localhost:8082/project/tmquestion/updateQuestion/"+bid,params, {
              headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
            }).then(function (response) {
              console.log(response.data.data);
              dataplace.updateDialogShowType0 = false;
              that1.$options.methods.searchAllQuestion(that1.$route.params.id,that1.$data);
            })
          }//如果是多选题
          else if(dataplace.questionType == "1"){
            for (let i=0;i<dataplace.readyOptionsMult.length;i++)
            {
              dataplace.totalNameMult += dataplace.readyOptionsMult[i].oname;
              dataplace.numberNameMult += dataplace.readyOptionsMult[i].oname.length+",";
            }
            for (let i=0;i<dataplace.readyOptionsMult.length;i++)
            {
              dataplace.totalDescMult += dataplace.readyOptionsMult[i].odesc;
              dataplace.numberDescMult += dataplace.readyOptionsMult[i].odesc.length+",";
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
            console.log(bid);
            axios.put("http://localhost:8082/project/tmquestion/updateQuestion/"+bid,params, {
              headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
            }).then(function (response) {
              console.log(response.data.data);
              dataplace.updateDialogShowType1 = false;
              that1.$options.methods.searchAllQuestion(that1.$route.params.id,that1.$data);
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  #app{
    width: 40%;
  }
  #right{
  ;
  }
</style>
