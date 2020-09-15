<template>
  <v-app>
    <header>
      <v-card 
        class="HeadNav" 
        color="#ffe4c4" 
        elevation="6"
      >
        <v-btn 
          class="logo"
          height="87px" 
          width="120"
          tile
          depressed
          color="red"
        >
          hi
        </v-btn>

        <group class="headgroup1">
          <ul class="nav hg1nav"><a href="">About</a></ul>
          <ul class="nav hg1nav"><a href="">News</a></ul>
          <ul class="nav hg1nav"><a href="">Support</a></ul>
        </group>
      </v-card>

      <div class="LogA nav" > 
        <v-btn tile large block color="success"
          v-on:click="LoginState = true" >
          {{LoginState ? Username : 'login'}}
          </v-btn> </div>
      <div class="LogA nav no-top-border"> 
        <v-btn tile large block color="success"
          v-on:click="LoginState = false">
          {{LoginState ? 'Log Out' : 'Create'}}
          </v-btn> </div>

    </header>
    <v-main>
      <LandingPage/>
    </v-main>
  </v-app>
</template>

<script>
import LandingPage from './components/LandingPage.vue';
export default {
  name: 'App',
  components: {
    LandingPage,
  },
  data () {
      return{
        Username: "Andwer",
        LoginState: false,
      };
    },
  };  
</script>

<style>
  body { overflow: hidden }
  header {
    text-align: center;
    position:relative;
    padding:0px;
    height:100px;
    display: grid;
    grid-template-columns:6fr 1fr 1fr;
    grid-template-rows:50px 50px;
    column-gap:5px;
  }
  .HeadNav {
    display:grid;
    grid-template-columns:0fr 0fr 0fr;
    padding: 3px;
    border-style:solid;
    border-color:black; 
    grid-gap:5px;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color:bisque;
    min-height:100px;
  }
  .logo {
    color: black;
    font-weight: bold;
    padding:2px;
    border-style: solid;
    width: 120px;
    height:88px;
    font-size: 70px;
    text-align:right;
    background-color:red;
    z-index: 6;
  }
  .hg1nav {
    width: 90px;
  }
  .nav {
    color:blue;
    font-weight: bold;
  }
  .no-top-border {
    border-top: black
  }
  .LogA {
    grid-column-start:3;
    background-color: beige;
    min-width:120px;
  }
  .headgroup1 {
    display:grid;
    border-style:solid;
    border-color:black;
    height: 30px;
    padding: 2px;
    padding-bottom:0px;
    grid-template-columns: 30px 30px 30px;
    width:400px;
    justify-content:left;
    grid-gap:110px;
  }
</style>