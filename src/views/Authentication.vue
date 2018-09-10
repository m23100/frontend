<template>
    <div class="Authentication">
        <div class="vipimg">
            <img src="../assets/img/vip.png" alt="">
        </div>
        <!-- 未认证 -->
        <div class="centent" v-if="state==-1">
            <h2 class="Title">认证信息</h2>
             <div class="xx"><img src="../assets/img/renzhenxiong.png" alt=""></div>
            <h3>当前处于未认证状态</h3>
            <div class="xxx"><el-button type="text" class="test" @click="centerDialogVisible = true">去认证</el-button></div> 
        </div>
         <div class="centent" v-if="state==0">
            <h2 class="Title">认证信息</h2>
             <div class="xx"><img src="../assets/img/imgtwo.png" alt=""></div>
            <h3>当前处于认证审核中</h3>
        </div>
        <!-- 认证成功后 -->
        <div class="centent" v-else-if="state==1">
            <h2 class="Title">认证信息</h2>
            <div class="PersonalData">
                <div class="name">
                    <span>真实姓名</span>
                    <div>{{real_name}}</div>
                </div>
                 <div class="number" >
                    <span>身份证号</span>
                    <div>{{id_number}}</div>
                </div>
                 <div class="income" >
                    <span>收入水平</span>
                   <el-select v-model="user_income" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="channel">
                    <span>自有渠道</span>
                    <div> {{channel_info}}</div>
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
            <div class="flex"><span>真实姓名</span> <input type="text" v-model="real_name" placeholder="填写真实姓名"></div>
            <div class="flex"><span>身份证号</span> <input type="text" v-model="id_number" placeholder="填写身份证号码"></div>
            <div class="flex"><span>手机号</span> <input type="text" v-model="phone" placeholder="填写手机号"></div>
            <div class="flex2 ">
                <span>上传身份证</span>
                 <el-upload
                    :headers="uploadHeaders"
                    action="http://dev.ruomengtv.com/api/image/imageUpload?type=auth"
                    list-type="picture-card"
                    :limit="2"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-exceed="handleExceed"
                    :on-remove="handleRemove"
                    :on-success="IDhandleSuccess"
                    :file-list="fileList"
                    >
                    <i class="el-icon-plus "></i>
                    <div class="el-upload__tip" slot="tip">上传身份证正反面</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="flex2"><span>收入水平</span>
              <el-select v-model="user_income" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select></div>
            <div class="flex2">
                <span>上传图片</span>
                 <el-upload
                    :headers="uploadHeaders"
                    action="http://dev.ruomengtv.com/api/image/imageUpload?type=auth"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreviewIncome"
                    :limit="1"
                    :file-list="fileList1"
                    :on-exceed="handleExceed"
                    :on-remove="IncomehandleRemove"
                     :on-success="IncomehandleSuccess">
                    <i  class="el-icon-plus "></i>
                    </el-upload>
                    <el-dialog :visible.sync="incomeProveVisible">
                    <img width="100%" :src="income_prove" alt="">
                </el-dialog>
            </div>
            <div class="flex1"><span>自有渠道</span> <input type="text" v-model="channel_info" placeholder="填写自有渠道信息">
            </div>
            <div class="flex2">
                <span>上传图片</span>
                 <el-upload
                    :headers="uploadHeaders"
                    action="http://dev.ruomengtv.com/api/image/imageUpload?type=auth"
                    list-type="picture-card"
                    :limit="1"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreviewChannel"
                    :on-exceed="handleExceed"
                    :on-remove="ChannelhandleRemove"
                     :file-list="fileList2"
                     :on-success="ChannelhandleSuccess">
                    <i  class="el-icon-plus "></i>
                    </el-upload>
                    <el-dialog :visible.sync="channelProveVisible">
                    <img width="100%" :src="channel_prove" alt="">
                </el-dialog>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="saveUserAuth" type="primary">提交</el-button>
            <el-button @click="centerDialogVisible = false">取消</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import api from "../http/api";
export default {
  data() {
    return {
      fileList: [],
      fileList2: [],
      fileList1: [],
      imgage_http_url: "http://image.ruomengtv.com/",
      dialogImageUrl: "", //身份证正反面
      dialogVisible: false,
      centerDialogVisible: false,
      incomeProveVisible: false,
      channelProveVisible: false,
      state: 0,
      name: "",
      options: [],
      value: "",
      uploadHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      real_name: "",
      id_number: "",
      id_image_just: "",
      id_image_back: "",
      user_income: "",
      income_prove: "",
      phone: "",
      channel_info: "",
      channel_prove: "",
      options2: []
    };
  },

  methods: {
    handleAvatarSuccess(res, file) {
      console.log("handleAvatarSuccess");
      console.log(res);
      console.log(file);
    },
    handleRemove(file, fileList) {
      //console.log(fileList)
      this.fileList = fileList;
    },
    IncomehandleRemove(file, fileList) {
      this.fileList1 = fileList;
    },
    ChannelhandleRemove(file, fileList) {
      this.fileList2 = fileList;
    },
    IDhandleSuccess(response, file, fileList) {
      if (this.fileList.length == 0) {
        this.fileList = [
          {
            name: "image",
            url: this.imgage_http_url + response.data.url
          }
        ];
      } else {
        this.fileList.push({
          name: "image",
          url: this.imgage_http_url + response.data.url
        });
      }
    },
    IncomehandleSuccess(response, file, fileList) {
      this.fileList1 = [
        { name: "image", url: this.imgage_http_url + response.data.url }
      ];
    },
    ChannelhandleSuccess(response, file, fileList) {
      this.fileList2 = [
        { name: "image", url: this.imgage_http_url + response.data.url }
      ];
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreviewIncome(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreviewChannel(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //   handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //   },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    showErrorMessage(messageContent) {
      this.$message({
        showClose: true,
        message: messageContent,
        type: "error"
      });
    },
    //验证表单信息
    fromValidate() {
      let nameValidata = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
      if (!nameValidata.test(this.real_name)) {
        return { status: false, message: "真实姓名为空或填写有误!" };
      }
      //let IdNumberValidate=/^\d{18}$/
      if (!/^\d{18}$/.test(this.id_number)) {
        return { status: false, message: "身份证号填写有误!" };
      }
      let phoneValidate = /^1[34578]{1}\d{9}$/;
      if (!phoneValidate.test(this.phone)) {
        return { status: false, message: "用户手机号填写有误!" };
      }
      if (this.fileList.length != 2) {
        return { status: false, message: "身份证正反面照片未进行上传!" };
      }
      if (!this.user_income) {
        return { status: false, message: "收入信息未进行选择!" };
      }
      if (this.fileList1.length != 1) {
        return { status: false, message: "收入照片未进行上传!" };
      }
      if (!this.channel_info) {
        return { status: false, message: "渠道信息未进行填写!" };
      }
      if (this.fileList2.length != 1) {
        return { status: false, message: "渠道照片未进行上传!" };
      }
      return { status: true, message: "" };
    },
    saveUserAuth() {
      let validate = this.fromValidate();
      if (!validate.status) {
        this.showErrorMessage(validate.message);
        return false;
      }
      console.log(this.fileList2[0].url);
      console.log(this.fileList1);
      console.log(this.fileList);
      console.log("000---00");
      //return false;
      console.log(this.id_image_just);
      let id_image_just_ = this.fileList[0].url.replace(
        "http://image.ruomengtv.com/",
        ""
      );
      let id_image_back_ = this.fileList[1].url.replace(
        "http://image.ruomengtv.com/",
        ""
      );
      let income_prove_ = this.fileList1[0].url.replace(
        "http://image.ruomengtv.com/",
        ""
      );
      let channel_prove_ = this.fileList2[0].url.replace(
        "http://image.ruomengtv.com/",
        ""
      );
      let fromdata = {
        real_name: this.real_name,
        id_number: this.id_number,
        id_image_just: id_image_just_,
        id_image_back: id_image_back_,
        user_income: this.user_income,
        income_prove: income_prove_,
        phone: this.phone,
        channel_info: this.channel_info,
        channel_prove: channel_prove_
      };
      console.log("9999999");
      console.log(fromdata);

      api.saveUserAuth(fromdata).then(res => {
        console.log("请求后的数据!");
        console.log(res);
        this.centerDialogVisible = false;
      });
    }
  },

  created() {
    api.getUserAuth().then(res => {
      //this.state = 1;
      this.state = res.data.isAuth;
      res.data.userIncomeList.forEach((element, index) => {
        this.options2.push({
          label: element.income,
          value: element.income_type
        });
      });
      if (res.data.isAuth >= 0) {
        let userAuthInfo = res.data.userAuthInfo;
        this.real_name = userAuthInfo.real_name;
        this.id_number = userAuthInfo.id_number;
        this.fileList = [
          {
            name: "image",
            url: this.imgage_http_url + userAuthInfo.id_image_just
          },
          {
            name: "image",
            url: this.imgage_http_url + userAuthInfo.id_image_back
          }
        ];
        this.fileList1 = [
          {
            name: "image",
            url: this.imgage_http_url + userAuthInfo.income_prove
          }
        ];
        this.fileList2 = [
          {
            name: "image",
            url: this.imgage_http_url + userAuthInfo.channel_prove
          }
        ];
        this.user_income = userAuthInfo.user_income;
        this.phone = userAuthInfo.phone;
        this.channel_info = userAuthInfo.channel_info;
      }
      console.log("-------------999-");
      console.log(this.income_prove);
    });
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
.image_show {
  width: 115px;
  height: 115px;
  display: block;
}
.image_show_id {
  width: 113px;
  height: 112px;
  display: block;
}
.image_show_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
}
.image_left {
  margin-left: 10px;
  width: 113px;
  height: 112px;
}
</style>