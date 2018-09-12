<template>
    <!-- 秒杀单审核中 -->
  <div class="Examineing">
    <el-table
      :data="list"
      highlight-current-row
      style="width: 100%"> 
      <el-table-column
        prop="goodstitle"
        label="商品标题"
        width="280">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="秒杀日期">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="秒杀场次">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="被拒原因">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="操作"
        width="180">
         <template slot-scope="scope">
          <el-button @click="editView(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteGoods(scope.row)" >撤销提交</el-button>
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
  import { mapGetters } from 'vuex';
  import api from '../../../http/api';
export default {
  data() {
    return {
      list:[],
      total:0,
      page:1
    };
  },
  methods:{
    handleCurrentChange(val) {
      api.getUserKillList({type:'refuse',page:val}).then(res =>{
        this.list = res.data.data
        this.total = res.data.total
        this.page = val
      })
    }
  },
  created(){
    // 提交审核中
    api.getUserKillList({type:'refuse',page:0}).then(res =>{
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
