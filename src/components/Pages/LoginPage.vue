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
        
      </v-sheet>
      </v-col>
    </v-row>
  </v-container>
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