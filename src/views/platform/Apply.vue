<template>
    <!-- 提交订单审核页 -->
    <div class="Apply">
         <div class="vipimg">
            <img src="../../public/img/vip.png" alt="">
        </div>
        <!-- 去申请 -->
        <div class="box" v-if="state==='3'">
            <h2 class="Title">实时数据</h2>
            <div class="centent"><img src="../../public/img/imgone.png" alt=""></div>
            <h3>您的放单权限处于未申请状态</h3>
            <div class="center"><el-button type="text" class="test" @click="centerDialogVisible = true">去申请</el-button></div>            
        </div>
        <!-- 审核中 -->
         <div class="box" v-else-if="state==='0'">
            <h2 class="Title">实时数据</h2>
            <div class="centent"><img src="../../public/img/imgtwo.png" alt=""></div>
            <h3>放单权限资格正在全力审核中，请耐心等待</h3>
            <div class="center"><el-button type="text" class="test">审核中</el-button></div>            
        </div>
        <!-- 拥有放单权限 -->
        <div class="box" v-else-if="state==='1'">
            <h2 class="Title">实时数据</h2>
            <div class="centent"><img src="../../public/img/imgthree.png" alt=""></div>
            <h3>上传时请注意仔细阅读积分规则，以免扣分影响正常放单权限~</h3>
            <div class="center"><el-button type="text" class="test" @click="Submission">去放单</el-button></div>            
        </div>
        <!-- 审核失败 -->
        <div class="box" v-else-if="state==='2'">
            <h2 class="Title">实时数据</h2>
            <div class="centent"><img src="../../public/img/imgfour.png" alt=""></div>
            <h3>审核未通过！<span class="Tips">被拒原因：无法联系到填写的QQ</span></h3>
            <div class="center"><el-button type="text" class="test" @click="centerDialogVisible = true">重新审核</el-button></div>            
        </div>
        <!-- 弹窗提交申请放单表单 -->
        <el-dialog
          title="上传放单权限资格申请资料"
          :visible.sync="centerDialogVisible" width="45%" center>
          <div  class="from">
            <div class="flex"><span>行业名称</span> <input type="text" v-model="name" placeholder="填写行业内熟知的名称"></div>
            <div class="flex"><span>联系人</span> <input type="text" v-model="name" placeholder="填写帐号联系人真实姓名"></div>
            <div class="flex"><span>联系QQ</span> <input type="text" v-model="name" placeholder="填写行业内熟知的名称"></div>
            <div class="flex"><span>手机号</span> <input type="text" v-model="name" placeholder="填写帐号联系人的11位手机号码"></div>
            <div class="textarea"><span>详细介绍</span><textarea name="" id="" cols="30" rows="10"  placeholder="详细介绍描述个人/团队情况，所在地、成员人数、收入实力等"></textarea></div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="Submission">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      name: "",
      state:'3'
    };
  },
  methods: {
    go: function() {
      this.$router.push({
        path: "/Submission"
      });
    },
    Submission: function() {
      console.log(this.name);
      this.$router.push({
        path: "/Submission"
      });
    }
  }
};
</script>
<style scoped>
.vipimg {
  margin-bottom: 15px;
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
.Apply .box {
  padding: 20px;
  background-color: #fff;
  height: 500px;
}
.centent {
  text-align: center;
}
.box h3 {
  color: #a0a0a0;
  font-size: 14px;
  text-align: center;
  margin: 20px 0;
}
.center{
  text-align: center;
  margin: 0 auto;
}
.test {
  width: 80px;
  height: 36px;
  background-color: #49a6f7;
  border-radius: 4px;
  border-radius: 8px;
  font-size: 14px;
  /* line-height: 36px; */
  color: #fff; 
  cursor: pointer;
}
.from {

}
.flex {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 12px 0;
}
.flex > span {
  /* span */
  /* padding: 30px 20px; */
  color: #989898;
  font-size: 14px;
  line-height: 36px;
}
.flex > input {
  width: 300px;
  border-radius: 4px;
  border: solid 1px #d3d3d3;
  padding: 10px;
}
.textarea {
  display: flex;
  justify-content: space-between;
  width: 84%;
}
.textarea > span {
  color: #989898;
  font-size: 14px;
  line-height: 36px;
}
.textarea > textarea {
  width: 84.5%;
  border-radius: 4px;
  border: solid 1px #d3d3d3;
  padding: 10px;
  resize: none;
}
.Tips{
  color: red;
}
</style>
             