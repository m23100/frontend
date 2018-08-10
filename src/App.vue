<template>
  <div id="app">
    <v-header></v-header>
    <div class="fiex">
      <v-sidenav></v-sidenav>
      <div class="box">
        <img src="./assets/logo.png">
      <router-view/>
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
  }
  .fiex{
     width: 1200px;
     margin: 6px auto;
     display: flex;justify-content: space-between;
     background-color: #f4f4f4;
  }
  .box{
    width: 100%;
    background-color: #fff;
    margin: 20px 20px 0 20px;
  }
</style>


