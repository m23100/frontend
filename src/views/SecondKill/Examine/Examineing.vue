<template>
    <!-- 秒杀单审核中 -->
  <div class="Examineing right-content">
    <h2 class="Title">秒杀审核中</h2>
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
        label="文案信息">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            trigger="click"
            v-model="scope.row.visible">
            <div class="item-content">
                <div class="item">
                  <div class="copys">
                    <div class="photo"><img :src="scope.row.copywritingimage.first" width="220" height="280" alt="商品"></div>
                    <div class="descr">
                      {{scope.row.goodstitle}}<br>
                      【原价{{scope.row.origprice}}元】券后【{{scope.row.voucherprice}}】<br>
                      领券：{{scope.row.couponlink}}<br>
                      抢购：{{scope.row.goodslink}}<br>
                      {{scope.row.copywriting.first}}
                    </div>
                  </div>
                  <div class="mask showmore hover">
                    <div class="cover">
                      <a href="#"><img :src="scope.row.coverimage.main" width="260" height="260" alt="产品名"></a>
                      <div class="btns">
                        <!-- <span>加入选品</span><span class="doCopy">点击复制</span> -->
                      </div>
                    </div>
                    <div class="content">
                      <h1 class="title">
                      {{scope.row.goodstitle}}</h1>
                      <div class="line"><div></div></div>
                      <div class="sales">
                        <div>券后<span>￥<b>{{scope.row.voucherprice}}</b></span></div>
                        <p>月销：{{scope.row.monthsales}}</p>
                      </div>
                      <div class="fee">佣金：{{scope.row.commissiontype}} <b>{{scope.row.commissionrate}}%</b></div>
                      <div class="coupon">
                        <div>
                          <span>{{scope.row.couponmoney}}元</span>
                        </div>
                        <p>
                          <span><img v-if="scope.row.shoptype==1" src="@/assets/img/icon-taobao.png" alt="taobao"><img v-if="scope.row.shoptype==2" src="@/assets/img/icon-tmall.png" alt="tmall"></span>
                          <span><img v-if="scope.row.activitytype==1" src="@/assets/img/icon-ju.png" alt="tmall"><img v-if="scope.row.activitytype==2" src="@/assets/img/icon-qiang.png" alt="tmall"></span>
                        </p>
                      </div>
                    </div>
                    <div class="extras">
                      <div class="row">
                        <span>推广销量增涨：<b>{{scope.row.increment}}</b></span>
                        <!-- <a href="#" class="error"><i>!</i> 商品纠错</a> -->
                      </div>
                      <div class="row">
                        <span>优惠券剩余：<b>{{scope.row.couponremain}}</b>/{{scope.row.coupontotal}}</span>
                      </div>
                      <div class="row">
                        <span>店铺：{{scope.row.shopname}}</span>
                      </div>
                      <!-- <div class="row">
                        <span>*</span>
                        <span>*</span>
                      </div> -->
                    </div>
                  </div>
                </div>
            </div>
            <el-button type="text" slot="reference">预览文案</el-button>
          </el-popover>
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
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import api from '@/http/api'
  import {pageSize} from '@/util/env' 
export default {
  data() {
    return {
      list:[],
      total:0,
      page:1,
      commissiontype:{
        1:"通用",
        2:"定向", 
        3:"鹊桥", 
        4:"营销"
      },
      pageSize:pageSize
    };
  },
  inject:['reload'],
  methods:{
    ...mapActions({ setGoodsType: 'setGoodsType',setGoodsInfo: 'setGoodsInfo',setGoodsKill:'setGoodsKill'}),
    editView(info){
      this.setGoodsType('kill')
      this.setGoodsInfo({link:info.goodslink,id:info.goodsid,editId:info.id,salecount:info.startsales,coverimage:info.coverimage.main})
      this.setGoodsKill({goodsTime:info.startfield,goodsDate:info.startdate})
      this.$router.push({
        path: "/Secondfrom",
      })
    },
    deleteGoods(info){
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.lowerFrameGood({id:info.id,status:5}).then(res=>{
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
            this.reload()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })      
      })
    },
    handleCurrentChange(val) {
      api.getUserKillList({type:'unaudited',page:val}).then(res =>{
        let that = this
        res.data.data.forEach(function(item,index){
          item.coverimage = JSON.parse(item.coverimage)
          let copywritingimage = JSON.parse(item.copywritingimage)
          let copywriting = JSON.parse(item.copywriting)
          item.copywriting = copywriting
          item.copywritingimage = copywritingimage
          item.commissiontype = that.commissiontype[item.commissiontype]
        })
        this.list = res.data.data
        this.total = res.data.total
        this.page = val
      })
    }
  },
  created(){
    // 提交审核中
    api.getUserKillList({type:'unaudited',page:0}).then(res =>{
        let that = this
        res.data.data.forEach(function(item,index){
          item.coverimage = JSON.parse(item.coverimage)
          let copywritingimage = JSON.parse(item.copywritingimage)
          let copywriting = JSON.parse(item.copywriting)
          item.copywriting = copywriting
          item.copywritingimage = copywritingimage
          item.commissiontype = that.commissiontype[item.commissiontype]
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
