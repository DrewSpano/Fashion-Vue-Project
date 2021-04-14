<template>
  <v-container fluid>
    <v-row 
      no-gutters 
      justify="center"
    >
      <v-col  lg=9 sm=12>
        <v-sheet
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <span class=profname>tracklist</span>

          <trackgroup 
            :debug="true"
            :showtrack="true"
            :arrayNum="this.$store.getters['Users/tracks']"
          />

          <v-divider/>

          <!-- <v-row 
            no-gutters
            justify="center"
          >
            <v-col cols=5>
              <v-btn 
                @click="addTrack"
                color = "#f5daba"
                tile
                elevation = 5
                block
              >
                add one 
              </v-btn>
            </v-col>
          </v-row>

          <v-row
            no-gutters
            justify="center"
          >
            <v-col cols=5>
              {{this.$store.getters['Track/trackTotal'] > 0 ? '':'Add a tracker with the button here to begin!'}}
              <br/> 
              <v-btn
                color = "#f5daba"
                tile
                elevation = 5
                block
                @click="delTrack"
              >
                remove one
              </v-btn>
            </v-col>
          </v-row> -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import Tracker from '../Parts/track';
import trackgroup from '../Parts/trackGroup'
export default {
  components: {
    //Tracker,
    trackgroup
  },

  methods: {
    // trackReorder() {
    //   this.$store.dispatch('GeneralStore/TrackReorder',{item1:1, item2:2});
    // },

    // addTrack() {
    //   this.$store.dispatch('GeneralStore/addTrack');
    // },

    // delTrack() {
    //   this.$store.dispatch('GeneralStore/delTrack');
    // },
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