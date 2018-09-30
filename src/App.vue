<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    provide(){
      return {
        reload:this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      }
    }
  }
</script>
<style>
/* 清除浏览器默认样式 */
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div,dl,dd,dt{margin:0;padding:0;border:0;}
body{background:#fff;color:#333;font-size:12px; margin-top:5px;font-family:"SimSun","宋体","Arial Narrow";}
ul,ol{list-style-type:none;}
select,input,img,select{vertical-align:middle;}
a{text-decoration:none;}
a:link{color:#009;}
a:visited{color:#800080;}
a:hover,a:active,a:focus{color:#c00;text-decoration:underline;}
/* 。。 */
.el-row {
  width: 200px !important;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #d1e9fd !important;
  border-left: 5px solid #49a6f7;
}
.el-submenu__title {
  color: #a0a0a0;
}
.el-submenu__title:hover {
  background-color: #d1e9fd !important;
  border-left: 5px solid #49a6f7;
}
.el-icon-setting {
  padding: 0 20 0 15px !important;
}
.el-menu-item {
  color: #a0a0a0;
}

.el-upload--picture-card {

}
.el-input--suffix .el-input__inner {
    background-color: #f0f0f0;
}
.el-upload--picture-card{
    width: 115px;
    height: 115px;
    line-height: 115px;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 115px;height: 115px;
}
.el-dialog__header{
  border-bottom: 1px solid #eee;
}
.el-dialog__footer{
  border-top: 1px solid #eee;
}
/* ueditor引入VUE */
</style>


