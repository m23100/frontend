<template>
  <div id="box">
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
import header from '../components/header';
import footer from "../components/footer";
import sidenav from '../components/sidenav';
export default {
  name: 'box',
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
<style scoped>
  .container{

  }
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
</style>