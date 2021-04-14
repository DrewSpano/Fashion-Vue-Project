<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col  lg=9 sm=12>
        <v-sheet
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          This is Donate! come here to give me money :)
          <v-btn color="orange" @click="login(1234)"> login to 1234 </v-btn>
          <v-btn color="pink" @click="login(4567)"> login to 4567 </v-btn>
          <v-btn color="red" @click="$store.commit('USER_DATA_DELETE_ALL')"> delete all </v-btn>
          <v-btn color="blue" @click="$store.dispatch('UserIDsSync')"> sync </v-btn>

          <v-btn color="gray" @click="testingMethod()"> push</v-btn>

<!-- ////////////////////////// -->
          <!-- {{this.$store.state.testModule.test1}}
          {{this.$store.getters["testModule/testA"]}} -->
<!-- /////////////////////////////// -->
          
          <br/> <br/>
          <v-text-field v-model="userID" label="what id to log into?"/>
          <v-btn color="teal" @click="$store.dispatch('UserLoginUpdate', userID)"> log into that one !! </v-btn>
          <br/> <br/>

          {{userInfo}}
          <br/><br/>=============================================================================<br/><br/>
          {{this.$store.state.users}}
          <br/><br/>
          {{this.$store.state.usersIDs}}
          <trackgroup
            :debug="false"
            :showtrail="false"
            :showtrack="true"
            :arrayNum="userInfo.tracks"
          />
            <!-- :arrayNum="$store.getters['GeneralStore/userTracksIfExists']" -->
          <!-- {{this.$store.state.GeneralStore.tracklistData[1]}} -->

        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters justify="center">
      <v-col lg=9 sm=12>
        <v-sheet
          rounded
          class="LPb ColTwo"
          color="#ffe4c4"
          elevation="3"
        >
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import trackgroup from '../Parts/trackGroup.vue';
// const axios = require('axios');
export default {
  mounted() {
    // axios.get('https://localhost:5001/api/Malltime')
    //   .then((response) => {
    //     console.log(response.data);
    //   })    
  },

  components: {
    trackgroup
  },

  data: function (){
    return{
      userID: null,
      trackName: "",
      trackLink: "",
      trackDescription: "",
      trackDay: "",
      trackTime: "",
      trackAMPM: "",
      trackTags: "",
      testInt: 1
    }
  },
  
  computed:{

    ...mapGetters ('Users',{
      userInfo: "info",
    })
  },

  methods: {
    testingMethod(){
      console.log('testingMethodInit')
      this.initFieldInfo({trackNumber: 1})
      .then( (response) => {
        console.log(response)
      })
        
      
    },

    login(accNumber) {
      try {
        this.UserLoginUpdate(accNumber)
      }
      catch (err) {
        console.log(err)
      }
    },

    ...mapMutations('Users',{
      USER_DATA_DELETE_ALL:'TOTAL_RESET'
    }),

    ...mapActions('Users',[
      'UserLoginUpdate',
      'UserIDsSync',
    ]),

    ...mapActions('Tracks', [
      'initFieldInfo',
    ])
  }
  // END OF COMPUTED //
    
}
</script>

<style scoped>
  .LPb {
    margin:20px;
    border:solid;
    font-weight: bold;
  }
  .profname {
    font-size: 50px
  }
  .sub {
    font-size:30px
  }

</style>