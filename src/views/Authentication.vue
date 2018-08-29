<template>
    <div class="Authentication">
        <div class="vipimg">
            <img src="../assets/img/vip.png" alt="">
        </div>
        <!-- 未认证 -->
        <div class="centent" v-if="state==='0'">
            <h2 class="Title">认证信息</h2>
             <div class="xx"><img src="../assets/img/renzhenxiong.png" alt=""></div>
            <h3>当前处于未认证状态</h3>
            <div class="xxx"><el-button type="text" class="test" @click="centerDialogVisible = true">去认证</el-button></div> 
        </div>
        <!-- 认证成功后 -->
        <div class="centent" v-else-if="state==='1'">
            <h2 class="Title">认证信息</h2>
            <div class="PersonalData">
                <div class="name">
                    <span>真实姓名</span>
                    <div>张三</div>
                </div>
                 <div class="number" >
                    <span>身份证号</span>
                    <div>13037851234"</div>
                </div>
                 <div class="income" >
                    <span>收入水平</span>
                   <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="channel">
                    <span>自有渠道</span>
                    <div> 5个采集群，10个2000人用户群，一个CMS站"</div>
                </div>                
            </div>
            <div class="update">
                <span @click="centerDialogVisible = true">申请更新</span>
            </div>
        </div>
        <!-- 弹窗提交申请放单表单 -->
        <el-dialog
          title="上传放单权限资格申请资料"
          :visible.sync="centerDialogVisible" width="36%" center>
          <div class="from">
            <div class="flex"><span>真实姓名</span> <input type="text" v-model="name" placeholder="填写真实姓名"></div>
            <div class="flex"><span>身份证号</span> <input type="text" v-model="name" placeholder="填写身份证号码"></div>
            <div class="flex2">
                <span>上传图片</span>
                 <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="flex1"><span>自有渠道</span> <input type="text" v-model="name" placeholder="填写自有渠道信息"></div>
            <div class="flex2">
                <span>上传图片</span>
                 <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="flex"><span>手机号</span> <input type="text" v-model="name" placeholder="填写帐号联系人的11位手机号码"></div>
            <div class="flex2">
                <span>上传图片</span>
                 <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">提交</el-button>
            <el-button @click="centerDialogVisible = false" type="primary">取消</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      centerDialogVisible: false,
      state: "1",
      name: "",
      options: [
        {
          value: "选项1",
          label: "5-10W/月"
        },
        {
          value: "选项2",
          label: "5-10W/月"
        },
        {
          value: "选项3",
          label: "5-10W/月"
        },
        {
          value: "选项4",
          label: "5-10W/月"
        },
        {
          value: "选项5",
          label: "5-10W/月"
        }
      ],
      value: ""
    };
  },
  
    methods: {
    //   handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //   },
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === 'image/jpeg';
    //     const isLt2M = file.size / 1024 / 1024 < 2;
 
    //     if (!isJPG) {
    //       this.$message.error('上传头像图片只能是 JPG 格式!');
    //     }
    //     if (!isLt2M) {
    //       this.$message.error('上传头像图片大小不能超过 2MB!');
    //     }
    //     return isJPG && isLt2M;
    //   }
    }

  
};
</script>
<style scoped>
.Authentication {
}

.Title {
  font-size: 18px;
  color: #000;
  border-left: 4px solid #43b5f9;
  line-height: 22px;
  padding-left: 10px;
  font-weight: 400;
}
.centent {
  background-color: #fff;
  padding: 20px 12px;
  height: 310px;
}
.xx {
  text-align: center;
}
.centent h3 {
  color: #a0a0a0;
  font-size: 14px;
  text-align: center;
  margin: 20px 0;
}
.xxx {
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
.PersonalData {
  padding: 5px 25px;
}
.PersonalData > div {
  padding: 12px 0;
}
.PersonalData > div > div {
  padding-left: 12px;
  color: #394853;
}
.PersonalData > div > span {
  font-size: 14px;
  line-height: 36px;
  color: #989898;
}
.name,
.number {
  display: flex;
  justify-content: space-between;
  width: 400px;
}
.name > div {
  width: 323px;
  height: 36px;
  line-height: 36px;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: left;
}
.number > div {
  width: 323px;
  height: 36px;
  line-height: 36px;
  color: #394853;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: left;
}
.income {
  display: flex;
  justify-content: space-between;
  width: 241px;
}
.income > div {
  width: 173px;
  height: 36px;
}
.channel {
  display: flex;
  justify-content: space-between;
  width: 660px;
}
.channel > div {
  width: 586px;
  height: 36px;
  line-height: 36px;
  color: #394853;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: left;
}
.update {
  width: 100%;
}
.update > span {
  width: 88px;
  height: 36px;
  background-color: #49a6f7;
  border-radius: 8px;
  font-size: 14px;
  line-height: 36px;
  color: #fff;
  cursor: pointer;
  float: right;
  text-align: center;
}
/* 弹窗 */
.flex {
  display: flex;
  justify-content: space-between;
  width: 65%;
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
.flex1 {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 12px 0;
}
.flex1 > span {
  color: #989898;
  font-size: 14px;
  line-height: 36px;
}
.flex1 > input {
  width: 525px;
  border-radius: 4px;
  border: solid 1px #d3d3d3;
  padding: 10px;
}
.flex2 {
  display: flex;
  width: 100%;
  margin: 12px 0;
}
.flex2 > span {
  color: #989898;
  font-size: 14px;
  line-height: 36px;
  margin-right: 35px;
}
.flex2 > input {
  width: 525px;
  border-radius: 4px;
  border: solid 1px #d3d3d3;
  padding: 10px;
}
.textarea {
  display: flex;
  justify-content: space-between;
  width: 84%;
}
</style>