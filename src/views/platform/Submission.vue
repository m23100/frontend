<template>
    <div class="Submission">
         <div class="vipimg">
            <img src="../../public/img/vip.png" alt="">
        </div>
        <div class="centent">
            <h2 class="Title">选择放单类型</h2>
            <div class="twoChoice">
                <img src="../../public/img/choice1.png" alt="入口" @click="go">
                <img src="../../public/img/choice2.png" alt="入口" @click="go">
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
      go: function() {
      this.$router.push({
        path: "/LinkDetection"
      });
    },
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
             