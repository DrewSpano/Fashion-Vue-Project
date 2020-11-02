<template>
  <v-container fluid>
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col  lg=7 sm=12>
        
        <v-sheet 
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <span class="ColTwo">This is all, or at least mostly, placeholder. What changes depends on whether or not I decide to actually handle accounts and how I do it. If I just use google login api then this is pretty much gone. </span>
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

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name:"CreatePage",
    }
    
</script>

<style scoped>
  
  .LPb {
    font-weight: bold;    
    text-align:center;
    word-wrap: break-word;
  }

  .ba{
    margin-bottom:20px;
  }

  
</style>