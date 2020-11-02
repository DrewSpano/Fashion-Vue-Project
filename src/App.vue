<template>
  <v-app >
    <!-- removed v-main here and above the /v-app -->
    <!--v-app-bar
      app
      color="#97B4C2"
      height = "100px" 
    
    --> 
      <WebHeader
      />
    <!--/v-app-bar-->

    <v-main >
      <router-view
      />
    </v-main>
  </v-app>
</template>

<script>
import WebHeader from './components/Parts/Header.vue';
export default {
  name: 'App',
  components: {
    WebHeader,
  },
};  
</script>


<style scoped>
  .LPb {
    padding:0px;
    margin:20px;
    min-width: 554px;
    width: auto;
    border:solid;
    font-weight: bold;    
    text-align:center;
  }
</style>