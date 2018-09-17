<template>
    <!-- 秒杀单审核中 -->
  <div class="Examineing right-content">
    <h2 class="Title">审核被拒</h2>
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
        :page-size="2"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { mapGetters,mapActions } from 'vuex';
  import api from '@/http/api';
  export default {
    data() {
      return {
        list:[],
        total:0,
        page:1
      };
    },
    methods:{
      ...mapActions({ setGoodsType: 'setGoodsType',setGoodsInfo: 'setGoodsInfo',setGoodsKill:'setGoodsKill'}),
      editView(info){
        // console.log(info.coverimage.main)
        this.setGoodsType('kill')
        this.setGoodsInfo({link:info.goodslink,id:info.goodsid,editId:info.id,salecount:info.salecount,coverimage:info.coverimage.main})
        this.setGoodsKill({goodsTime:info.startfield,goodsDate:info.startdate})
        this.$router.push({
          path: "/Secondfrom",
        })
      },
      handleCurrentChange(val) {
        api.getUserKillList({type:'refuse',page:val}).then(res =>{
          res.data.data.forEach(function(item,index){
            item.refuse = JSON.parse(item.refuse)
            item.coverimage = JSON.parse(item.coverimage)
          })
          this.list = res.data.data
          this.total = res.data.total
          this.page = val
        })
      }
    },
    created(){
      // 提交审核中
      api.getUserKillList({type:'refuse',page:0}).then(res =>{
          res.data.data.forEach(function(item,index){
            item.refuse = JSON.parse(item.refuse)
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
