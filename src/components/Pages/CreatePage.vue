<template>
  <body class="LPa">
      <v-card 
        class="LPb ColTwo"  
        color="#ffe4c4" 
        elevation="3"
      > 
        <p class="ColTwo">This is all, or at least mostly, placeholder. What changes depends on whether or not I decide to actually handle accounts and how I do it. If I just use google login api then this is pretty much gone. </p>
        <v-text-field
          label="your@email.com"
          class="ColTwo"
          tabindex=1
        > </v-text-field>

        <v-text-field
          label="Username"
          class="ColTwo"
          tabindex=1
        > </v-text-field>

        <v-text-field
          label="password"
          class="ColTwo"
          tabindex=1
        > </v-text-field>

        <v-text-field
          label="confirm password"
          class="ColTwo"
          tabindex=1
        > </v-text-field>

        <v-btn
            class = "ColTwo"
            link
            to="/"
            color=success
        >
            create account
        </v-btn>
      </v-card>
  </body>
</template>

<script>
export default {
    name:"CreatePage",
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