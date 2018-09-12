<template>
  <div class="Viptestok">
    <el-table
      :data="list"
      highlight-current-row
      style="width: 100%"> 
      <el-table-column
        prop="goodstitle"
        label="商品名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="couponremain"
        label="被拒原因">
      </el-table-column>
      <el-table-column
        prop="passtime"
        label="通过时间">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="操作"
        width="180">
         <template slot-scope="scope">
          <el-button @click="editView(scope.row)" type="text" size="small">修改重新提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="2"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import api from '@/http/api'
  export default {
    data() {
      return {
        list:[],
        total:0,
        page:1
      }
    },
    methods:{
      handleCurrentChange(val) {
        api.auditedGoods({type:0,page:val}).then(res =>{
          this.list = res.data.data
          this.total = res.data.total
          this.page = val
        })
      }
    },
    created(){
      api.auditedGoods({type:0}).then(res =>{
        this.list = res.data.data
        this.total = res.data.total
      })
    }
  }
</script>
<style lang="scss" scoped  type="text/css">
.Viptestok{
  padding-bottom: 20px;
  background-color: #fff; 
  .pagination{
    margin-top: 20px;
    text-align: center;
  }
}
</style>