<template>
  <body class="LPa">

      <v-card 
        class="LPb ColTwo"  
        color="#ffe4c4" 
        elevation="3"
      > 
        <p class="ColTwo">This is all, or at least mostly, placeholder. What changes depends on whether or not I decide to actually handle accounts and how I do it. If I just use google login api then this is pretty much gone. </p>
        <v-text-field
          label="Username"
          class="ColTwo"
          tabindex=1
        > </v-text-field>

        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
          class="ColTwo"
          tabindex=2
        > </v-text-field>
        
        <v-btn  
          class = "ColTwo"
          tabindex=3
          link
          to="/"
          @click="logTrue"
        >
          login 
        </v-btn>

        <div class="ColTwo ba">
          <a href="">Forgot username?</a><a href="">Forgot Password?</a>
        </div>

        <v-btn
          class="ColTwo"
          small
          link
          to = "Create"
        >
          Create account
        </v-btn>
        
      </v-card>

  </body>
</template>

<script>
export default {
    name:"LoginPage",

    data () {
      return {
        show1: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        }
      }
    },

    methods: {
        logTrue() {
            this.$emit('login-state-toggled', true);
        },
        logFalse() {
            this.$emit('login-state-toggled', false);
        },
    },
    
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