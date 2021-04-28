<template>
  <v-container fluid>
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col  lg=9 sm=12>

        <v-sheet 
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
        <p class="ColTwo">This is placeholder, and serves simply to show user and login functionality. 
          <br/> use the user id to log in
        <v-text-field
          label="Username"
          class="ColTwo"
          tabindex=1
          v-model = "username"
        > </v-text-field>

        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          disabled            
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
          @click="login()"
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
import { mapActions } from 'vuex'
export default {
    name:"LoginPage",

    data () {
      return {
        username:'',
        show1: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        }
      }
    },

    methods: {
      // logTrue() {
      //     this.$emit('login-state-toggled', true);
      // },
      // logFalse() {
      //     this.$emit('login-state-toggled', false);
      // },

      login(){
        console.log('cum')
        this.Login(this.username)
      },
      ...mapActions('User',{
        Login: 'UserLogin'
      })

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