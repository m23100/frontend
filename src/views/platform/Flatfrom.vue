<template>
    <!-- 平推表单 -->
    <div class="Firefrom">
        <h2 class="Title">商品链接检测</h2>
        <div class="centent">
                <div class="component">
                    <h2>商品ID</h2>
                    <div class="detection">
                        <!-- <input type="text" placeholder="{{link}}"> -->
                        <div>{{goodslink}}</div>
                        <span class="start">已检测通过</span>
                    </div>
                </div>
                <div class="component">
                    <h2>开始时间</h2>
                    <div class="Choice">
                         <el-radio v-model="radioo" label="立即开始">立即开始</el-radio>
                         <el-radio v-model="radioo" label="预约开始">预约开始</el-radio>
                    </div>                   
                </div>
                <div class="component">
                    <h2>优惠券类型</h2>
                    <div class="Choice">
                         <el-radio v-model="coupontype" label="2">阿里妈妈优惠券</el-radio>
                    </div>                   
                </div>
                <div class="component">
                    <h2>活动类型</h2>
                    <div class="Choice">
                        <el-radio v-model="activitytype" label="0">无活动</el-radio>
                        <el-radio v-model="activitytype" label="1">淘抢购</el-radio>
                        <el-radio v-model="activitytype" label="2">聚划算</el-radio>
                    </div>                    
                </div>
                <div class="component">
                    <h2>封面图</h2>
                    <div class="Choice">
                        <el-upload
                        :headers="uploadHeaders"
                        :limit="1"
                        action="http://dev.ruomengtv.com/api/image/imageUpload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :file-list="filelist"
                        :on-success="filesuccess1">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                           <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <span>要求：图片大小400*400px，干净清晰，突显产品,不能出现牛皮癣、大量文字</span> 
                    </div>
                                       
                </div>
                 <div class="component">
                    <h2>文档主图</h2>
                    <div class="Choice">
                        <el-upload
                        :headers="uploadHeaders"
                        :limit="1"
                        action="http://dev.ruomengtv.com/api/image/imageUpload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :file-list="filelist"
                        :on-success="filesuccess">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <span>要求：图片大小800*1200px，干净清晰，结构美观，突出产品卖点</span>
                    </div>                                        
                </div>
                <div class="component">
                    <h2>短标题</h2>
                    <div class="Choice flex">
                       <input class="input" type="text" v-model="title" placeholder="将产品短标题输入或粘贴于此">
                       <span class="span">要求：精简干练，表达重点信息,如品牌、产品名、数量、克重等</span>
                    </div>                                        
                </div>
                <div class="component">
                    <h2>券后价</h2>
                    <div class="Choice">
                       <input class="Price" v-model="Price" type="number"><span class="rmb">元</span>
                    </div>                                        
                </div>
                <div class="component">
                    <h2>优惠券链接</h2>
                    <div class="Choice">
                       <input class="input" v-model="link" type="text" placeholder="将产品对应优惠券链接输入或粘贴于此">
                    </div>                                        
                </div>
                 <div class="component">
                    <h2>优惠券总量</h2>
                    <div class="Choice flex">
                       <input class="Price" type="number" v-model="yhnumber">
                       <span class="span">要求：优惠券跟商品对应，券名无敏感词，总量不能少于5000张</span>
                    </div>                                        
                </div>
                 <div class="component">
                    <h2>佣金比率</h2>
                    <div class="Choice">
                       <input class="Price" type="number" v-model="Commission"><span class="rmb">%</span>
                    </div>                                        
                </div>
                 <div class="component">
                    <h2>佣金类型</h2>
                    <div class="Choice" >
                        <el-radio v-model="commissiontype" label="1">营销</el-radio>
                        <el-radio v-model="commissiontype" label="2">通用</el-radio>
                        <el-radio v-model="commissiontype" label="3">定向</el-radio>
                        <el-radio v-model="commissiontype" label="4">鹊桥</el-radio>
                    </div>                    
                </div>
                 <div class="component">
                    <h2>导购文案</h2>
                    <div class="Choice">
                        <textarea data-v-716a6b68="" v-model="Copywriting" name="" id="" cols="30" rows="10" 
                        placeholder="要求：20-200字精简文案，突出产品亮点，需求交痛点，为什么值得买！注意不要用空格"></textarea>
                    </div>                    
                </div>
                 <div class="bottom">
                        <span @click="Submission">提交审核</span>
                        <button @click="cancel">取消</button>
                </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../http/api'
export default {
  data() {
    return {
      radioo:'',
      goodsid:'',         //淘宝商品ID
      goodslink:'',       //淘宝商品链接
      radio: "2018-09-04 00:01:00",    //商品开始上线时间
      coupontype:'2',      //优惠券类型
      activitytype: "1",    //活动类型
      title:'',             //商品标题
      Price:'',             //券后价格
      link:'',              //优惠券链接
      yhnumber:'',          //优惠券总量
      Commission:'',        //佣金比率
      commissiontype:'1',   //佣金类型
      Copywriting:'',       //导购文案
      coverimage:'',         //封面图
      copywritingimage:'',   //文案图
      dialogImageUrl: '',    
      dialogVisible: false,   
      filelist:[],
      uploadHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    };
  },

  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl, this.dialogVisible);
      },
      //图片上传成功时的钩子
      filesuccess(response, file){
        // console.log(response,file);
        console.log(response.data.url)
        this.coverimage=response.data.url
      },
      filesuccess1(response, file){
        console.log(response.data.url)
        this.copywritingimage=response.data.url
      },
      go: function() {
        this.$router.push({
            path: "/Viptesting"
        });
      },
      cancel:function(){
          this.$router.push({
              path:"/Apply"
          })
      },

      //提交表单信息
      Submission(){
          let data={
             goodsid:this.goodsid,
             goodslink:this.goodslink,
             goodstitle:this.title,
             coverimage:this.coverimage,
             commissiontype:this.commissiontype,
             commissionrate:this.Commission,
             copywriting:this.Copywriting,
             copywritingimage:this.copywritingimage,
             voucherprice:this.Price,
             couponlink:this.link,
             coupontotal:this.yhnumber,
             begintime:this.radio,
             coupontype:this.coupontype,
             activitytype:this.activitytype,
             startsales:'10000'
          }
          console.log(data)
          api.createnormal(data).then(res =>{
              console.log(res)
          })
      }
      
  },
  created(){
        console.log(this.$route.query.link)
        console.log(this.$route.query.goodsid)
        // 取到路由带过来的参数 
        let routerquery = this.$route.query.link
        // 将数据放在当前组件的数据内        
        this.goodslink = routerquery  

        let routequery = this.$route.query.goodsid
        this.goodsid =routequery
        // console.log(this.$store.state.loginStatus)

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
.detection>div{
    width: 423px;
    height: 17px;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    border: 1px solid #eee;
    background-color: #f4f4f4;
    padding-left: 30px;
    padding: 10px 0 10px 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
  cursor: pointer;
}
.component {
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
    margin-top: 110px;
    padding-top: 25px;
    border-top:1px solid #eee;
    position: relative;
}
.bottom>span{
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
.bottom>button{
    position: absolute;
    right: 40px;
    bottom: 6px;
    width: 68px;
    height: 28px;
    border-radius: 4px;
    background-color: #fff;
    border: solid 1px #a4a4a4;
    text-align: center;
    cursor: pointer;
}
</style>
             