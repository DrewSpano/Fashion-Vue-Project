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
          <v-btn @click="trackReorder"> swap 1 and 2 </v-btn>
          <v-btn @click="$store.dispatch('TrackClone',1)"> clone 1 </v-btn>
          {{this.$store.getters.trackTotal}}
          {{this.$store.state.tracklistData}}
          {{this.$store.getters.trackAllBlanks(1)}}

          <!--v-row
            no-gutters
            v-for="n in $store.state.totalTrackers"
            :key="n"
          >
          <Tracker
            :num="n"
          />
          </v-row-->

          <trackgroup 
            :showtrack="true"
            :lastNum="this.$store.getters.trackTotal"
          />

          <v-divider/>

          <v-row 
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
              {{this.$store.getters.trackTotal > 0 ? '':'Add a tracker with the button here to begin!'}}
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
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import Tracker from '../Parts/track';
import trackgroup from '../Parts/trackGroup'
export default {
  mounted() {
  //   //defining variables...
  //   const totalTrackers = this.$store.state.totalTrackers;
  //   const tracklistData = this.$store.state.tracklistData;
  //   const getData = this.$store.getters;
  //   //on load...

  //   // REPLACE FUNCTION //
  //   //for each track
  //   for (var i = 1; i <= totalTrackers; i++) {
  //     //if the track is blank and is not undefined
  //     //if (tracklistData.allBlanks(i) === true && typeof(tracklistData[i]) !== undefined) {
  //     if (getData.trackAllBlanks(i) === true && typeof(tracklistData[i]) !== undefined) {
  //       //track i is blank
  //       //find the track to put in its spot:
  //       //for each track past the blank track
  //       for (var j = i + 1; j <= totalTrackers; j++) {
  //         //if the track past the blank track isnt blank and isn't undefined...
  //         if (getData.trackAllBlanks(j) !== true && typeof(tracklistData[j]) !== undefined) {
  //           // REPLACE i WITH j //
  //           console.log('replacing',i,'with',j)
  //           //tracker variable to make sure it only copies once.
  //           var executed = false;
  //           if (executed === false) {
  //             tracklistData[i] = tracklistData[j];
  //             executed = true;
  //           }
  //           //i should now equal j            
  //           //remove j
  //           this.$store.commit('TrackClear', j)
  //           // REPLACED DONE //
  //           break
  //         }
  //       }
  //     }
  //   }

  //   //removed blank tracks at the list. 
  //   //Works because the code right before this moves all blank tracks to the end of the list
  //   for (var ii=1; ii<= totalTrackers; ii++){
  //     if (getData.trackAllBlanks(ii) === true && typeof(tracklistData[i]) !== undefined) {
  //       this.$store.commit('setTrack', ii-1)
  //       break
  //     }
  //   }

  // // END OF MOUNT //
  },

  data: function() {
    return {
    }
  },

  components: {
    //Tracker,
    trackgroup
  },

  methods: {
    trackReorder() {
      this.$store.dispatch('TrackReorder',{item1:1, item2:2});
    },

    addTrack() {
      this.$store.dispatch('addTrack');
    },

    delTrack() {
      this.$store.dispatch('delTrack')
    },
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