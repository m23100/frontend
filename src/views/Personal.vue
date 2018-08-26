<template>
  <div class="Personal">
      <div class="archives">
          <h2 class="Title">头像</h2>
          <div class="Photo">
              <div></div>
              <h2>修改</h2>
              <span class="baocun">保存</span>
          </div>
          
      </div>
      <div class="centent">
              <h2 class="Title">认证信息</h2>
            <div class="PersonalData">
                <div class="name">
                    <span>昵称</span>
                    <div>张三</div>
                </div>
                 <div class="number">
                    <span>签名</span>
                    <div>13037851234</div>
                </div>
                 <div class="income">
                    <span>城市</span>
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
                    <span>QQ</span>
                    <div>输入对外公开联系的QQ</div>
                </div>                
            </div>
            <div class="update">
                <span>保存</span>
            </div>
          </div>
      </div>
</template>
<script>
 export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '深圳'
        }, {
          value: '选项4',
          label: '南昌'
        }, {
          value: '选项5',
          label: '杭州'
        }],
        value: ''
      }
    }
  };
</script>
<style scoped>
.Capital {
}
.archives {
  padding: 20px 10px;
  background-color: #fff;
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
.Photo {
  margin-left: 60px;
  height: 174px;
  position: relative;
}
.Photo > div {
  width: 144px;
  height: 144px;
  border-radius: 50%;
  background-color: #ebebeb;
  float: left;
}
.Photo > h2 {
  float: left;
  margin: 57px 0 0 50px;
  color: #43b5f9;
}
.baocun {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 36px;
  background-color: #49a6f7;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  line-height: 36px;
}
/* lk */
.centent {
  background-color: #fff;
  padding: 20px 12px;
  height: 330px;
  border-top: 1px solid #eee;
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
.name{
  display: flex;
  justify-content: space-between;
  width: 240px;
}
.number {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
.name > div {
  width: 163px;
  height: 36px;
  line-height: 36px;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: left;
}
.number > div {
  width: 423px;
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
  width: 238px;
}
.income > div {
  width: 173px;
  height: 36px;
}
.channel {
  display: flex;
  justify-content: space-between;
  width: 380px;
}
.channel > div {
  width: 306px;
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
</style>