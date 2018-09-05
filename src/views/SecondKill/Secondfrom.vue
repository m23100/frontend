<template>
    <!-- 秒杀表单 -->
    <div class="Firefrom">
        <h2 class="Title">填写秒杀单产品信息</h2>
        <div class="centent">
                <div class="component">
                    <h2>封面图</h2>
                    <div class="Choice">
                        <el-upload
                        :limit="1"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <!-- <i class="el-icon-plus"></i> -->
                        <el-button slot="trigger" size="small" type="primary">上传封面</el-button>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <span>要求：图片大小400*400px，干净清晰，突显产品,不能出现牛皮癣、大量文字</span>
                    </div>
                </div>
                <div class="component">
                    <h2>标题</h2>
                    <div class="Choice flex">
                       <input class="input" type="text" placeholder="将产品短标题输入或粘贴于此">
                       <span class="span">要求：精简干练，表达重点信息,如品牌、产品名、数量、克重等</span>
                    </div>
                </div>
                <div class="component">
                    <h2>券后价</h2>
                    <div class="Choice">
                       <input class="Price" type="number"><span class="rmb">元</span>
                    </div>
                </div>
                 <div class="component">
                    <h2>佣金比率</h2>
                    <div class="Choice">
                       <input class="Price" type="number"><span class="rmb">%</span>
                    </div>
                </div>
                 <div class="component">
                    <h2>佣金类型</h2>
                    <div class="Choice">
                        <el-radio v-model="radio2" label="1">营销</el-radio>
                        <el-radio v-model="radio2" label="2">通用</el-radio>
                        <el-radio v-model="radio2" label="3">定向</el-radio>
                        <el-radio v-model="radio2" label="4">鹊桥</el-radio>
                    </div>
                </div>
                 <div class="component">
                    <h2>优惠券总量</h2>
                    <div class="Choice flex">
                       <input class="Price" type="number">
                       <span class="span">要求：优惠券跟商品对应，券名无敏感词，总量不能少于5000张</span>
                    </div>
                </div>
                <div class="component upwenan">
                    <h2>文案主图</h2>
                    <el-upload
                        :limit="1"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span>要求：图片大小800*1200px，干净清晰，结构美观，突出产品卖点</span>
                    </el-upload>
                </div>
                 <div class="component">
                    <h2>商品链接</h2>
                    <div class="Choice">
                       <input class="input" type="text" placeholder="将产品对应商品链接输入或粘贴于此">
                    </div>
                </div>
                 <div class="component">
                    <h2>优惠券链接</h2>
                    <div class="Choice">
                       <input class="input" type="text" placeholder="将产品对应优惠券链接输入或粘贴于此">
                    </div>
                </div>
                 <div class="component">
                    <h2>导购文案</h2>
                    <div class="Choice">
                        <textarea data-v-716a6b68="" name="" id="" cols="30" rows="10"
                        placeholder="要求：20-200字精简文案，突出产品亮点，需求交痛点，为什么值得买！注意不要用空格"></textarea>
                    </div>
                </div>
                 <div class="component">
                    <h2>活动类型</h2>
                    <div class="Choice">
                        <el-radio v-model="radio1" label="1">无活动</el-radio>
                        <el-radio v-model="radio1" label="2">淘抢购</el-radio>
                        <el-radio v-model="radio1" label="3">聚划算</el-radio>
                    </div>
                </div>
                <div class="bottom">
                    <div class="up">
                        <span class="upone">上一步</span><span class="Submission">提交</span>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import api from '../../http/api';
export default {
  data() {
    return {
      active: 0,
      radio: "1",
      radio1: "1",
      radio2:'1',
       dialogImageUrl: '',
        dialogVisible: false
    };
  },
  created(){
    api.saveKillGood().then(res =>{
      console.log(res)
    })
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl, this.dialogVisible);
      },
      handlePreview(file) {
        console.log(file);
      },

      go: function() {
        this.$router.push({
            path: "/Flatfrom"
        });
      },

  }
};
</script>
<style scoped>
.Firefrom{height: 2280px;}
.Title {
  font-size: 18px;
  color: #000;
  border-left: 4px solid #43b5f9;
  line-height: 22px;
  padding-left: 10px;
  font-weight: 400;
  margin-bottom: 25px;
}
.centent {
  background-color: #fff;
  padding: 20px;
}
.detection {
  display: flex;
      margin: 25px 0;
    width: 565px;
  justify-content: space-between;
}
.detection > input {
  width: 423px;
  height: 35px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  border: 1px solid #eee;
  background-color: #f4f4f4;
  padding-left: 30px;
  outline: none;
}
.start {
  display: block;
  width: 110px;
  line-height: 38px;
  background-color: #7d6db1;
  text-align: center;
  color: #fff;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
}
.component {
}
.upwenan{
    width: 52%;
    margin-bottom: 20px;
}
.component > h2 {
  font-weight: 400;
}
.Choice{
    margin: 20px 0;
}
.Choice>input{
    padding-left: 10px;
    outline:none;
}
.Choice>textarea{
    width: 64.5%;
    border-radius: 4px;
    border: solid 1px #d3d3d3;
    padding: 10px;
    resize: none;
    outline:none;
}
.Choice>span{
    color: #cfcfcf;
    font-size: 14px;
}
.flex{
    display: flex;
    justify-content: space-between;
}
.input{
    height: 40px;
    width: 467px;
    border: 1px solid #eee;
    border-radius: 10px;
    outline:none;
}
.span{
    line-height: 69px;
    color: #d0d0d0;
    font-size: 15px;
}

.Price{
    height: 40px;
    border-radius: 10px;
    width: 80px;
    padding-left: 20px;
    border: 1px solid #eee;
}
.rmb{
    color: #000;
    font-size: 16px;
    margin-left: 15px;
}
/*上传图片*/
.el-upload--picture-card{

}
.bottom{
    margin-top: 62px;
    padding-top: 25px;
    border-top:1px solid #eee;
}
.up{
    display: flex;
    justify-content: space-between;
    width: 30%;
    margin: 0 auto;
}
.upone{
    display: block;
    width: 110px;
    line-height: 38px;
    background-color: #fff;
    text-align: center;
    color: #848484;
    margin: 0 auto;
    border:1px solid #848484;
    border-radius: 6px;
    cursor: pointer;
}
.Submission{
    display: block;
    width: 110px;
    line-height: 38px;
    background-color: red;
    text-align: center;
    color: #fff;
    margin: 0 auto;
    border-radius: 6px;
    cursor: pointer;
}
</style>

