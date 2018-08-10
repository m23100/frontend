<template>
  <div id="app">
    <v-header></v-header>
    <img src="./assets/logo.png">
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './components/header';
import footer from "./components/footer";
export default {
  name: 'App',
  components:{
    'v-header':header,
    'v-footer':footer
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
