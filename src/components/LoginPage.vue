<template>
  <body class="LPa">

      <v-card 
        class="LPb ColTwo"  
        color="#ffe4c4" 
        elevation="3"
      > 
        <p class="ColTwo">Welcome to my website!</p>
        <p class="ColTwo">This website exists to help you spend money on things you don't need! 
        Specifically, Clothing! 
        How will it do that? check out below!</p>
      </v-card>

  </body>
</template>

<script>
export default {
    name:"LoginPage"
    
}
</script>

<style>
  .LPa {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;   
    grid-auto-rows:auto; 
    grid-auto-flow:row;
  }
  
  .LPb {
    margin:20px;
    padding-top:30px;
    padding-bottom:30px;
    min-width: 554px;
    width: auto;
    border:solid;
    font-weight: bold;    
    text-align:center;
    word-wrap: break-word;

    display:grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-auto-rows:auto; 
    grid-auto-flow:row;

    background-color:bisque;
  }

  .ColTwo{
    grid-column-start:2;
  }

  .ba{
    margin-bottom:20px;
  }

  
</style>