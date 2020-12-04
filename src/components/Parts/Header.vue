<template>
  <v-app-bar
    app
    color="#97B4C2"
    height = "100px"
  >
    <v-container fluid>
      <v-row no-gutters align="center">

        <v-col cols=6 sm=1>
          <v-btn
            class="logo"
            height="87px"
            width="120"
            tile
            depressed
            color="red"
            link
            to = "Dash"
          >
            Home
          </v-btn>
        </v-col> 
        
        <v-col align-self="start" cols=3 sm=2 md=1 lg=2 offset=0 offset-sm=1 offset-lg=0 > 
          <v-card color = "#ffe4c4">
            <v-row dense align="center" justify="space-around">
              <v-col cols=12 lg=4 sm=12>
                <router-link to="/"> About </router-link></v-col>
              <v-col cols=12 lg=4 sm=12>
                <router-link to="/Blog"> Blog </router-link> </v-col>
              <v-col cols=12 lg=4 sm=12>
                <router-link to="/Donate"> Donate </router-link> </v-col>
            </v-row>
          </v-card> 
        </v-col> 

        <v-col sm=6 md=7 cols=1 />
        
        <v-col cols=2>
          <div class="LogA" >
            <v-btn
              tile
              large
              block
              color = "success"
              link :to = "$store.state.loginState ? 'Profile' : 'Login' "
              @click="logTrue"
            >
              {{$store.state.loginState ? 'My Account' : 'Log In'}}
            </v-btn>
          </div>

          <div class="LogA">
            <v-btn
              tile
              large
              block
              color = "success"
              link :to = "$store.state.loginState ? '/' : 'Create' "
              @click="logFalse"
            >
              {{$store.state.loginState ? 'Log Out' : 'Create'}}
            </v-btn>
          </div>
        </v-col>

      </v-row>
    </v-container>

  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: {
      myUsername: String,
      myLoginState: Boolean,
  },
  methods: {
      logTrue() {
          this.$store.commit('logTrue');
      },
      logFalse() {
          this.$store.commit('logFalse');
      },
  },
    
}
</script>

<style lang="scss" scoped>
 #hr{
    padding:0px;
    height:100px;
    text-align: center;
    display: grid;
    grid-template-columns:6fr 1fr 1fr;
    grid-template-rows:50px 50px;
  }
  #minwid{
    min-width:600px;
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
  .LogA {
    grid-column-start:3;
    background-color: beige;
    min-width:120px;
  }
/*   .headgroup1 {
    display:grid;
    height: 30px;
    grid-template-columns: 30px 30px 30px;
    grid-gap:110px;
    grid-row-start:1 ;
  } */
</style>