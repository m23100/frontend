<template>
    <div class="Submission">
         <div class="vipimg">
            <img src="../../assets/img/vip.png" alt="">
        </div>
        <div class="centent">
            <h2 class="Title">选择放单类型</h2>
            <div class="twoChoice">
                <img src="../../assets/img/choice1.png" alt="入口" @click="gotype('normal')">
                <img src="../../assets/img/choice2.png" alt="入口" @click="gotype('fire')">
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {};
  },
  methods:{
      ...mapActions({ setGoodsType: 'setGoodsType'}),
      gotype: function(type) {
        this.setGoodsType(type)
        this.$router.push({
          path: "/LinkDetection"
        });
      },
     // gofire: function() {
     //    this.setGoodsType('fire')
     //    this.$router.push({
     //      path: "/Firefrom"
     //    });
     // },
 }
};
</script>
<style scoped>
.vipimg {
  margin-bottom: 15px;
}
.centent {
  padding: 15px 10px;
  background-color: #fff;
  height: 528px;
  margin-bottom: 20px;
}
.Title {
  font-size: 18px;
  color: #000;
  border-left: 4px solid #43b5f9;
  line-height: 22px;
  padding-left: 10px;
  font-weight: 400;
  margin-bottom: 25px;
}
.twoChoice {
  display: flex;
  margin: 0 auto;
  width: 78%;
  margin-top: 100px;
}
.twoChoice img{
    margin: 0 30px;
    cursor: pointer;
    display: block;
}
</style>
             