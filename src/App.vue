<template>
  <div id="app">
    <v-header></v-header>
    <div class="fiex">
        <v-sidenav></v-sidenav>

        <div class="box">
             <router-view>
               
             </router-view>
        </div>      
    </div>
    
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './components/header';
import footer from "./components/footer";
import sidenav from './components/sidenav';
export default {
  name: 'App',
  components:{
    'v-header':header,
    'v-footer':footer,
    'v-sidenav':sidenav
  },
  data(){
    return{

    }
  },
  methods:{

  },
  computed:{

  }
}
</script>
<style src="@/public/css/reset.css"></style>
<style>
  body{
    background-color: #e3e3e3 !important;
    font-family: "微软雅黑";
  }
  .fiex{
     width: 1200px;
     margin: 10px auto 30px;
     display: flex;justify-content: space-between;
     background-color: #f4f4f4;
     border-radius: 10px;
  }
  .box{
    width: 100%;
    margin: 24px 20px 0 17px;
  }
  .el-row{
    width: 200px !important;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #d1e9fd !important;
    border-left: 5px solid #49a6f7;
}
.el-submenu__title:hover {
    background-color: #d1e9fd !important;
    border-left: 5px solid #49a6f7;
}
.el-icon-setting{
  padding: 0 20 0 15px !important;
}
</style>


