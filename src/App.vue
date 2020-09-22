<template>
  <v-app>
    <v-main 
    >
      <WebHeader 
        :myUsername="Username"
        :myLoginState="LoginState"
        @login-state-toggled="LoginState = $event"
      ></WebHeader>

      <router-view 
        @login-state-toggled="LoginState = $event"
        :myUsername="Username"
        :myLoginState="LoginState"
      ></router-view> 
    </v-main>
  </v-app>
</template>

<script>
import WebHeader from './components/Header.vue';
export default {
  name: 'App',

  data () {
      return{
        Username: "Andwer",
        LoginState: false,
    };
  },

  components: {
    WebHeader
  },

  
};  
</script>

<style>
</style>