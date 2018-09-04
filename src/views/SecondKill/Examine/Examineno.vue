<template>
    <!-- 秒杀单审核被拒 -->
    <div class="Examineno">
        <div class="list-head">
            <div style=" width: 30%;text-align: left;">商品名</div>
            <div style=" width: 15%;">秒杀日期</div>
            <div style=" width: 15%;">秒杀场次</div>
            <div style=" width: 20%;">被拒原因</div>
            <div style=" width: 20%;">操作</div>
        </div>
        <div class="content">
            <div class="testlist" v-for="(item,index) in getKillRefuseGoods" :key="index">
               <div class="commodity">
                   <img v-bind:src="item.coverimage" alt=""><span>{{item.goodstitle}}</span>
               </div>
                 <div style=" width: 15%;">{{item.startdate}}</div>
                <div style=" width: 15%;">{{item.startfield}}</div>
                <div style=" width: 20%;">{{item.content}}</div>
                <div style=" width: 20%;">修改并重新提交</div>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import api from '../../../http/api';
export default {
  data() {
    return {
      getKillRefuseGoods:[]
    };
  },
  created(){
    //获取提交秒杀未通过用户数据
    api.getKillRefuseGoods().then(res =>{
      this.getKillRefuseGoods = res.data.data;
      console.log(this.getKillRefuseGoods)
    })

  }
};
</script>
<style scoped>
.list-head {
  display: flex;
  padding: 20px 20px 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
.list-head > div {
  color: #8697ac;
  font-size: 16px;
  text-align: center;
}
.content {
  background-color: #fff;
}
.testlist {
  display: flex;
  padding: 12px 0px;
  margin: 0 20px;
  border-bottom: 1px solid #eee;
}
.testlist > div {
  text-align: center;
  line-height: 32px;
}
.testlist>div>span{
    color: #000;
    cursor: pointer;
}
.testlist .commodity {
   width: 30%;
  text-align: left;
}
.commodity > span {
  margin-left: 20px;
}
.testlist .preview {
  display: block;
  width: 82px;
  height: 24px;
  background-color: #ccc;
  color: #000;
  margin: 0 auto;
  margin-top: 6px;
  border-radius: 15px;
  line-height: 24px;
  cursor: pointer;
}
  img{
    height: 20px;
    width: 20px;
  }

</style>
