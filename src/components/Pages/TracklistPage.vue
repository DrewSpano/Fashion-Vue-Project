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
          <v-btn @click="$store.commit('TrackReorder',{item1:1, item2:2})"> swap 1 and 2 </v-btn>
          <v-btn @click="$store.commit('TrackClone',1)"> clone 1 </v-btn>

          <v-row
            no-gutters
            v-for="n in $store.state.totalTrackers"
            :key="n"
          >
          <Tracker
            :num="n"
          />
          </v-row>

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
              {{this.$store.state.totalTrackers > 0 ? '':'Add a tracker with the button here to begin!'}}
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
import Tracker from '../Parts/track';
export default {
  mounted() {
    //defining variables...
    const totalTrackers = this.$store.state.totalTrackers;
    const tracklistData = this.$store.state.tracklistData;
    //on load...

    //for each track
    for (var i = 1; i <= totalTrackers; i++) {
      //if the track is blank and is not undefined
      if (tracklistData.allBlanks(i) === true && typeof(tracklistData[i]) !== undefined) {
        //track i is blank
        console.log('track', i, 'is blank')
        //find the track to put in its spot:
        //for each track past the blank track
        for (var j = i + 1; j <= totalTrackers; j++) {
          //if the track past the blank track isnt blank and isn't undefined...
          if (tracklistData.allBlanks(j) !== true && typeof(tracklistData[j]) !== undefined) {
            // REPLACE i WITH j //
            console.log('replacing',i,'with',j)
            //tracker variable to make sure it only copies once.
            var executed = false;
            if (executed === false) {
              tracklistData[i] = tracklistData[j];
              executed = true;
            }
            //i should now equal j            
            //remove j
            this.$store.commit('TrackClear', j)
            // REPLACED DONE //
            break
          }
        }
      }
    }

    //removed blank tracks at the list. Works because the code right before this
    //moves all blank tracks to the end of the list
    for (var ii=1; ii<= totalTrackers; ii++){
      if (tracklistData.allBlanks(ii) === true && typeof(tracklistData[i]) !== undefined) {
        this.$store.commit('setTrack', ii-1)
        break
      }
    }

  // END OF MOUNT //
  },

  components: {
    Tracker
  },

  methods: {
    addTrack() {
      //The initial data store has the first track initialized, and from here we
      //make sure that the one past the most recent track is initialized as well.
      //Even though the user should never see the "most recent + 1", we initialize
      //it to avoid any issues. 
      var curTracks = this.$store.state.totalTrackers + 1;
      const allData = this.$store.state.tracklistData;
      //+1 to the amount of tracks displayed
      this.$store.commit('addTrack');
      //if the track with the highest number + 1 IS initialized, return
      if (typeof allData.curTracks != "undefined") {return}
      //if uninitialized, initialize it
      else {this.$store.commit('TrackCreate', curTracks)}
    },

    delTrack() {
      if (this.$store.state.totalTrackers > 0) {
        this.$store.commit('delTrack')
      }
    },

    //pruneTracks is used on TracklistPage load to delete tracks that are empty
    pruneTracks () {
      for (var i = 0; i <= this.$store.state.totalTrackers; i++) {
        if (this.$store.state.tracklistData.allBlanks(i) === true) {
          console.writeline('track ', i, 'is blank')
        }
      }
      //for each track
        //if $store.allblanks === true
          //delete
        //else continue
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