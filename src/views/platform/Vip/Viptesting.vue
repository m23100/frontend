<template>
  <div class="Viptesting">
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
        label="文案信息">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            trigger="click"
            v-model="scope.row.visible">
            <div class="item-content">
                <div class="item">
                  <div class="copys">
                    <div class="photo"><img src="http://temp.im/220x280" height="280" alt="商品"></div>
                    <div class="descr">
                      全网最低！全网最低！<br>
                      【火爆ins】高腰韩版九分缩脚裤！<br>
                      【原价39.9元】券后【19.9元】包邮<br>
                      领券：https://uland.taobao.com/quan/detail?sellerId=3857273069&amp;activityId=17b37d22e22a444caa809fedcc80d9e6<br>
                      抢购：https://detail.tmall.com/item.htm?id=568895965597<br>
                      【全网最低价】黑色帅气自信，粉色仙女本尊！超多颜色，任卿翻牌！夏天清凉标配~超多size，各种身材轻松驾驭！【赠运费险】
                    </div>
                  </div>
                  <div class="mask showmore hover">
                    <div class="cover">
                      <a href="#"><img src="http://temp.im/260x260" alt="产品名"></a>
                      <div class="btns">
                        <span>加入选品</span><span class="doCopy">点击复制</span>
                      </div>
                    </div>
                    <div class="content">
                      <h1 class="title">【三只松鼠旗舰店】夏威夷果185gx2袋艺术硕士 顶起</h1>
                      <div class="line"><div></div></div>
                      <div class="sales">
                        <div>券后<span>￥<b>28.90</b></span></div>
                        <p>月销：22222</p>
                      </div>
                      <div class="fee">佣金：通用 <b>30%</b>（10元）</div>
                      <div class="coupon">
                        <div>
                          <span>10元</span>
                        </div>
                        <p>
                          <span><img src="/assets/images/icon-tmall.png" alt="tmall"></span>
                          <span><img src="/assets/images/icon-qiang.png" alt="tmall"></span>
                        </p>
                      </div>
                    </div>
                    <div class="extras">
                      <div class="row">
                        <span>推广销量增长：<b>2000</b></span>
                        <a href="#" class="error"><i>!</i> 商品纠错</a>
                      </div>
                      <div class="row">
                        <span>优惠券剩余：<b>2000</b>/2000</span>
                      </div>
                      <div class="row">
                        <span>店铺：三只松鼠旗舰店</span>
                      </div>
                      <div class="row">
                        <span>放单人：某用户</span>
                        <span>1分钟前</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <el-button type="text" slot="reference">预览文案</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="提交时间">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="开始时间">
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
  import api from '@/http/api'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        list:[],
        total:0,
        page:1
      }

    },
    methods:{
      ...mapActions({ setGoodsType: 'setGoodsType',setGoodsLink: 'setGoodsLink'}),
      editView(info){
        this.setGoodsLink({link:info.goodslink,id:info.goodsid,editId:info.id})
        this.setGoodsType('normal')
        this.$router.push({
          path: "/Flatfrom",
        })
      },
      viewCopy(info){
        console.log(info)
        api.viewCopy({id:info.id}).then(res=>{
          if(res.code==0){
            // this.isShow = true

          }
        })
      },
      deleteGoods(info){
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteGoods({id:info.id}).then(res=>{
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
      handleCurrentChange(val) {
        api.auditing({type:0,state:0,page:val}).then(res =>{
          this.list = res.data.data
          this.total = res.data.total
          this.page = val
        })
      }
    },
    created(){
      api.auditing({type:0,state:0}).then(res =>{
        this.list = res.data.data
        this.total = res.data.total
      })
    }
  };
</script>

<style lang="scss" scoped  type="text/css">
.Viptesting{
  padding-bottom: 20px;
  background-color: #fff; 
  .pagination{
    margin-top: 20px;
    text-align: center;
  }
}
</style>