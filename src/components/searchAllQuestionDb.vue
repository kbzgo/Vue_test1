<template>
  <div id="app">
    <p><el-button @click="searchAllQuestionDb($data)" type="success">查询所有题库</el-button></p>
    <p><el-button @click="addDialogShow = true" type="success">添加新题库</el-button></p>
    <el-table :data="questionDbs" border style="width: 100%">
      <el-table-column fixed prop="dbCode" label="题库编号" width="150">
      </el-table-column>
      <el-table-column prop="dbName" label="题库名" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="findByQuestionDb(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="changeShow(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteQuestionDb(scope.row)" type="text" size="small">停用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改题库"
      :visible.sync="detailDialogShow"
      width="25%">
      <el-input v-model="QuestionDb.dbName" placeholder="请输入新的题库名"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogShow = false">取 消</el-button>
        <el-button @click="updateQuestionDb()" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加题库"
      :visible.sync="addDialogShow"
      width="25%">
      <p><el-input v-model="newQuestionDbCode" placeholder="请输入题库编号"/></p>
      <el-input v-model="newQuestionDbname" placeholder="请输入题库名"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogShow = false">取 消</el-button>
        <el-button @click="addNewQuestionDb()" type="primary">确 定</el-button>
      </span>
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
        questionDbs : [],
        QuestionDb : "",
        newQuestionDbCode : "",
        newQuestionDbname : "",
        detailDialogShow : false,
        addDialogShow : false
      }
    },
    mounted(){
      let that = this;
      that.$options.methods.searchAllQuestionDb(that.$data);
    },
    methods:{
      searchAllQuestionDb(dataplace){
        if(sessionStorage.getItem("authKey") == null){
          alert("请先登录");
          this.$router.push({ path: '/login' });
        }else{
          axios.get("http://localhost:8082/project/tmQuestionDb/findAllDbByPagination?rows=10&page=1",{
            headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
          }).then(function (response) {
            console.log(response);
            dataplace.questionDbs = response.data.rows;
          })
        }
      },
      deleteQuestionDb(p1){
        let that = this;
        axios.delete("http://localhost:8082/project/tmQuestionDb/deleteDb/"+p1.businessId,{
          headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
        }).then(function (response) {
          console.log(response);
          that.$options.methods.searchAllQuestionDb(that.$data);
        })
      },
      changeShow(p1){
        let that = this;
        this.$data.QuestionDb = p1;
        that.$data.detailDialogShow = true;
      },
      updateQuestionDb(){
        let that = this;
        let params = new URLSearchParams();
        params.append("dbName",that.$data.QuestionDb.dbName);
        axios.put("http://localhost:8082/project/tmQuestionDb/updateDb/"+that.$data.QuestionDb.businessId,params,{
          headers: {"Authorization": "Bearer "+sessionStorage.getItem("authKey")}
        }).then(function (response) {
          console.log(response);
          that.$data.detailDialogShow = false;
          that.$options.methods.searchAllQuestionDb(that.$data);
        })
      },
      addNewQuestionDb() {
        let that = this;
        let params = new URLSearchParams();
        params.append("dbCode", that.$data.newQuestionDbCode);
        params.append("dbName", that.$data.newQuestionDbname);
        axios.post("http://localhost:8082/project/tmQuestionDb/addDb", params, {
          headers: {"Authorization": "Bearer " + sessionStorage.getItem("authKey")}
        }).then(function (response) {
          console.log(response);
          that.$data.addDialogShow = false;
          that.$options.methods.searchAllQuestionDb(that.$data);
        })
      },
      findByQuestionDb(p1){
        this.$router.push({ path: '/searchAllQuestion/'+p1.dbCode });
      }
    }
  }
</script>

<style scoped>
  #app  {
    width: 25%
  }
</style>
