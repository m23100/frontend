<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
</script>
<style src="@/public/css/reset.css"></style>
<style>
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
    background-color: #f23539;
    border:1px solid #f23539;
    outline:none; 
    position: relative;
    /* upimg */
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 88px;
    height: 29px;
    line-height: 146px;
    vertical-align: text-bottom;
}
/* .el-step .is-success {
    color: #43b5f9!important;
    border-color: #43b5f9!important;
}
.el-step .el-step__title {
    color: #43b5f9!important;
    border-color: #43b5f9!important;
}
.el-step__main{
  display: none;
} */
/* ueditor引入VUE */
</style>


