<template>
  <div class="Viptestok right-content">
    <h2 class="Title">平推被拒</h2>
    <el-table
      :data="list"
      highlight-current-row
      style="width: 100%"> 
      <el-table-column
        label="商品名"
        width="280">
        <template slot-scope="scope">
          <img :src="scope.row.coverimage.main" alt="商品" class="coverimage">
          <span style="margin-left: 10px">{{ scope.row.goodstitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="refuse.content"
        label="被拒原因">
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
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import api from '@/http/api'
  import { mapActions } from 'vuex'
  import {pageSize} from '@/util/env' 
  export default {
    data() {
      return {
        list:[],
        total:0,
        page:1,
        type:0,
        state:3,
        pageSize:pageSize
      }
    },
    methods:{
      ...mapActions({ setGoodsType: 'setGoodsType',setGoodsInfo: 'setGoodsInfo'}),
      handleCurrentChange(val) {
        api.auditing({type:this.type,state:this.state,page:val}).then(res =>{
          res.data.data.forEach(function(item,index){
            item.refuse = JSON.parse(item.refuse)
            item.coverimage = JSON.parse(item.coverimage)
          })
          this.list = res.data.data
          this.total = res.data.total
          this.page = val
        })
      },
      editView(info){
        this.setGoodsInfo({link:info.goodslink,id:info.goodsid,editId:info.id})
        this.setGoodsType('normal')
        this.$router.push({
          path: "/Flatfrom",
        })
      },
    },
    created(){
      api.auditing({type:this.type,state:this.state}).then(res =>{
        res.data.data.forEach(function(item,index){
          item.refuse = JSON.parse(item.refuse)
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