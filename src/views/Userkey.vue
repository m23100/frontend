<template>
  <div class="Personal">
    <div class="centent">
      <h2 class="Title">密钥管理</h2>

      <div class="PersonalData">
        <el-form label-position="right" label-width="110px" class="demo-ruleForm">
          <el-form-item label="SecretKey" prop="name" v-if="skey">
            <el-input :type="show? 'text':'password'" readonly  v-model="skey"></el-input>
          </el-form-item>
          <el-form-item label="显示/隐藏" v-if="skey">
            <el-switch v-model="show"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getkey">{{btnstr}}</el-button>
          </el-form-item>
        </el-form>          
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/http/api'
    export default{
        data(){
           return{
              skey:'',
              password:'password',
              btnstr:"创建密钥",
              show: false,
              confirm_str:'此操作将生成密钥, 是否继续?'
           }
        },
        methods:{
            getkey() {
                this.$confirm(this.confirm_str, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  api.resetAppkey().then(res=>{
                    if(res.code==0){
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                        this.skey= res.data.appkey
                        this.btnstr="重置密钥"
                    }else{
                      this.$message({
                        type: 'info',
                        message: '操作失败'
                      })
                    }
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            },
        },
        created(){
            api.getAppkey().then(res =>{
                if(res.code==0){
                    this.skey=res.data.appkey
                    this.btnstr="重置密钥"
                    this.confirm_str='重置后老的密钥将失效, 是否继续?'
                }
            })
        }          
        
    }
</script>
<style scoped>
.centent {
  background-color: #fff;
  padding: 20px 12px;
  height: 500px;
  border-top: 1px solid #eee;
}
.Title {
  font-size: 18px;
  color: #000;
  border-left: 4px solid #43b5f9;
  line-height: 22px;
  padding-left: 10px;
  font-weight: 400;
}
.el-input{
    width: 330px;
    display: inline-table;
}
.PersonalData{
    margin-top: 30px;
}
</style>
