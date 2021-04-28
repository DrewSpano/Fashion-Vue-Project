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
          some buttons and fields here to allow for user functions... login, logout, change tracks, change username?, create user<br/>
          current user: [{{this.user}}] or [{{this.userID}}]....... user List: {{this.userList}}................. track List: [{{this.tracks}}]
          <v-row no no-gutters>
            <v-col cols=2>
              <v-text-field
              label='user ID'
              v-model="newUserID"
              type="number"
              />
            </v-col>
            <v-btn
              class=mx-1
              color = red
              @click = login(newUserID)
            >
              login
            </v-btn>

            <v-btn
              class=mx-1
              color = orange
              @click = logout()
            >
              logout
            </v-btn>

            <v-btn
              class = mx-1
              color = blue
              @click = UserCreate(userData)
            >
              create random user
            </v-btn>
            <!-- add a confirmation for the delete user button. A screen popup maybe. Would be good practice for those popup type things.  -->
            <v-btn
              class = mx-1
              color = red
              disabled
              
            >
              Delete Current User
            </v-btn>
          </v-row>

          <v-row no-gutters>
            <v-col cols = 2>
              <v-text-field
                label='track'
                v-model="newTrack"
                type="number"
              />
            </v-col>

            <v-btn
              class=mx-1
              color = yellow
              @click = addTrack(newTrack)
            >
              add track
            </v-btn>
            
            <v-btn
              class=mx-1
              color = purple
              @click = removeTrack(newTrack)
            >
              remove track
            </v-btn>
          </v-row>
          <v-row no-gutters>
            <v-btn
              class=mx-1
              color = green
            >
              edit name
            </v-btn>
          </v-row>

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
        >tracks of the current user
          <trackgroup
            :debug="true"
            :showtrail="false"
            :showtrack="true"
            :userID="this.user"
          />
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import trackgroup from '../Parts/trackGroup.vue';
export default {
  data: function () {
    return{
      userID: null,
      newUserID: null,
      userData: {username: "test", email: "test@test"},
      newTrack: null,
    }
  },

  components: {
    trackgroup
  },
  
  computed:{
    //if user is null (logged out) return array as null. if user is logged in, return the tracks
    compTracks: function() {
      if (!this.user) {
        return null
      }
      else {return this.tracks}
    },
    ...mapGetters ('Users',{
      user: "user",
      tracks: "tracks",
      userList: "userList",
    }),

    ...mapGetters('Track', {
      trackList: "trackList"
    })
  },

  methods: {
    login(id) {this.userID = parseInt(id)
      this.UserLogin(parseInt(id))
    },
    logout() {this.userID = null},
    addTrack(track) {
      if (track > 0) {  
        this.UserAddTrack({id: this.user, track: parseInt(track)})
      }
    },
    removeTrack(track) {
      if (track > 0) {
        this.UserRemoveTrack({id: this.user, track: parseInt(track)})
      }
    },


    ...mapActions ('Users',{
      UserLogin: "UserLogin",
      UserCreate: "UserCreate",
      UserAddTrack: "UserAddTrack",
      UserRemoveTrack: "UserRemoveTrack",
    })

  }
    
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