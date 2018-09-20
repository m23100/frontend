<template>
  <div class="Viptestok right-content">
    <h2 class="Title">平推通过</h2>
    <el-table
      :data="list"
      highlight-current-row
      style="width: 100%"> 
      <el-table-column
        label="商品名"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.coverimage.main" alt="商品" class="coverimage">
          <span style="margin-left: 10px">{{ scope.row.goodstitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="passtime"
        label="通过时间">
      </el-table-column>
      <el-table-column
        prop="couponremain"
        label="销量增长">
      </el-table-column>
      <el-table-column
        prop="increment"
        label="领券信息">
        <template slot-scope="scope">
          {{scope.row.coupontotal}}张({{scope.row.coupontotal}}/{{scope.row.coupontotal-scope.row.couponremain}})
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsstate"
        label="操作"
        width="180">
         <template slot-scope="scope">
          <el-button v-if="scope.row.goodsstate==2" @click="offGoods(scope.row)" type="success" round size="small">下架</el-button>
          <el-button v-if="scope.row.goodsstate==4 ||scope.row.goodsstate==6" type="warning" round size="small">已下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import api from '@/http/api'
  import {pageSize} from '@/util/env' 
  export default {
    data() {
      return {
        list:[],
        total:0,
        page:1,
        type:0,
        state:1,
        pageSize:pageSize
      }
    },
    inject:['reload'],
    methods:{
      handleCurrentChange(val) {
        api.auditing({type:this.type,state:this.state,page:val}).then(res =>{
          res.data.data.forEach(function(item,index){
            item.coverimage = JSON.parse(item.coverimage)
          })
          this.list = res.data.data
          this.total = res.data.total
          this.page = val
        })
      },
      offGoods(info){
        this.$confirm('此操作将下架该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.lowerFrameGood({id:info.id,status:6}).then(res=>{
            if(res.code==0){
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.reload()
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
            message: '已取消操作'
          })      
          this.reload()
        })

      },

    },
    created(){
      api.auditing({type:this.type,state:this.state}).then(res =>{
        res.data.data.forEach(function(item,index){
          item.coverimage = JSON.parse(item.coverimage)
        })
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