<template>
    <!-- 秒杀单审核中 -->
  <div class="Examineing right-content">
    <h2 class="Title">秒杀通过</h2>
    <el-table
      :data="list"
      highlight-current-row
      style="width: 100%"> 
      <el-table-column
        prop="goodstitle"
        label="商品标题"
        width="280">
        <template slot-scope="scope">
          <img :src="scope.row.coverimage.main" alt="商品" class="coverimage">
          <span style="margin-left: 10px">{{ scope.row.goodstitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="startdate"
        label="秒杀日期">
      </el-table-column>
      <el-table-column
        prop="startfield"
        label="秒杀场次">
      </el-table-column>
      <el-table-column
        prop="increment"
        label="销量增长">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="领券信息">
        <template slot-scope="scope">
          {{scope.row.coupontotal}}张({{scope.row.coupontotal}}/{{scope.row.coupontotal-scope.row.couponremain}})
        </template>
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="操作"
        width="180">
         <template slot-scope="scope">
          <el-button v-if="scope.row.goodsstate==2" @click="offGoods(scope.row)" type="success" round size="small">下架</el-button>
          <el-button v-if="scope.row.goodsstate==4" type="warning" round size="small">已下架</el-button>
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
  import { mapGetters } from 'vuex';
  import api from '@/http/api';
  import {pageSize} from '@/util/env' 
export default {
  data() {
    return {
      list:[],
      total:0,
      page:1,
      pageSize:pageSize
    };
  },
  methods:{
    handleCurrentChange(val) {
      api.getUserKillList({type:'allow',page:val}).then(res =>{
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
      })
    },
  },
  created(){
    // 提交审核中
    api.getUserKillList({type:'allow',page:0}).then(res =>{
      res.data.data.forEach(function(item,index){
        item.coverimage = JSON.parse(item.coverimage)
      })
      this.list = res.data.data
      this.total = res.data.total
    })
  }
};
</script>
<style lang="scss" scoped  type="text/css">
.Examineing{
  padding-bottom: 20px;
  background-color: #fff; 
  .pagination{
    margin-top: 20px;
    text-align: center;
  }
}
</style>
