<template>
    <div class="Authentication">
        <div class="vipimg">
            <img src="../public/img/vip.png" alt="">
        </div>
        <!-- 未认证 -->
        <div class="centent" v-if="state==='0'">
            <h2 class="Title">认证信息</h2>
             <div class="xx"><img src="../public/img/renzhenxiong.png" alt=""></div>
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
                    <div>5-10W/月"</div>
                </div>
                <div class="channel">
                    <span>自有渠道</span>
                    <div> 5个采集群，10个2000人用户群，一个CMS站"</div>
                </div>                
            </div>
            <div class="update">
                <span>申请更新</span>
            </div>
        </div>
        <!-- 弹窗提交申请放单表单 -->
        <el-dialog
          title="上传放单权限资格申请资料"
          :visible.sync="centerDialogVisible" width="45%" center>
          <div class="from">
            <div class="flex"><span>行业名称</span> <input type="text" v-model="name" placeholder="填写行业内熟知的名称"></div>
            <div class="flex"><span>联系人</span> <input type="text" v-model="name" placeholder="填写帐号联系人真实姓名"></div>
            <div class="flex"><span>联系QQ</span> <input type="text" v-model="name" placeholder="填写行业内熟知的名称"></div>
            <div class="flex"><span>手机号</span> <input type="text" v-model="name" placeholder="填写帐号联系人的11位手机号码"></div>
            <div class="textarea"><span>详细介绍</span><textarea name="" id="" cols="30" rows="10"  placeholder="详细介绍描述个人/团队情况，所在地、成员人数、收入实力等"></textarea></div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" >确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
        centerDialogVisible: false,
        state:'1',
        name:''
    };
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
.xxx{
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
.PersonalData{
    padding: 5px 25px;
}
.PersonalData>div{
    padding: 12px 0;
}
.PersonalData>div>div{
    padding-left: 12px;
    color: #394853;
}
.PersonalData>div>span{
    font-size: 14px;
   line-height: 36px;
   color: #989898;
}
.name,.number{
    display: flex;
    justify-content: space-between;
    width: 400px;
}
.name>div{
    width: 323px;
    height: 36px;
    line-height: 36px;
	background-color: #f0f0f0;
    border-radius: 4px;
    text-align: left;
}
.number>div{
    width: 323px;
    height: 36px;
    line-height: 36px;
    color: #394853;
	background-color: #f0f0f0;
    border-radius: 4px;
    text-align: left;
}
.income{
    display: flex;
    justify-content: space-between;
    width: 238px;
}
.income>div{
    width: 160px;
    height: 36px;
    line-height: 36px;
    color: #394853;
	background-color: #f0f0f0;
    border-radius: 4px;
    text-align: left;
}
.channel{
    display: flex;
    justify-content: space-between;
    width: 660px;
}
.channel>div{
    width: 586px;
    height: 36px;
    line-height: 36px;
    color: #394853;
	background-color: #f0f0f0;
    border-radius: 4px;
    text-align: left;
}
.update{
    width: 100%;
}
.update>span{
    width: 88px;
    height: 36px;
    background-color: #49a6f7;
    border-radius: 8px;
    font-size: 14px;
    line-height: 36px;
    color: #fff;
    cursor: pointer;
    float: right;
    text-align:center;
}
</style>