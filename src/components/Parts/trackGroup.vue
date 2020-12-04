<template>
  <v-container fluid>
    <span>{{trailArray}} | {{lastNum}} | {{this.$store.getters.trackTotal}}</span>
    <v-row 
      no-gutters 
      justify="center"
      v-for="n in trailArray"
      :key = n
    > 
    <Track :num='n' v-if="showtrack"/>
    <Trail :num='n' v-if="showtrail" v-show="trailIsActive(n)"/>
    </v-row>


  </v-container>
</template>

<script>
import Track from './track';
import Trail from './trail';
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    this.ReorderUp();
    this.PruneEnd();
    this.TrailArraySetToDefault();
  },

  destroyed() {
    this.ReorderUp();
    this.PruneEnd();
    this.TrailArraySetToDefault();
  },

  components: {
    Track,
    Trail
  },

  props: {
    totaltohighest: {type:Boolean},
    topdown: {
      //
      type: Boolean
    },
    showtrack: {
      type: Boolean,
      default: false
    },
    showtrail: {
      type: Boolean,
      default: false
    },
    prioBool: {
      type: Boolean,
      default: false
    },
    firstNum: {
      type: Number,
      default: 1
    },
    lastNum:{
      type: Number,
      //Want to set the default as total trackers, but don't think I can...
      //So instead I'm setting this as required.
      //default: this.$store.getters.trackTotal
      required: true
    },
    skipNum: Number,
    prioNum: Number,
  },
  
  data() {
    return {
      trailArray: [],
    }
  },

  computed: {
    //trackArray exists just in case I didn't properly move things over correctly
    // trackArray: function () {
    //   console.log('use baseArray')
    //   return undefined
    // },
    baseArray: function ()  {
      var tempArray = []
      
      //add numbers to array
      for (var i=this.firstNum; i<=this.lastNum; i++) {
        if ( i !== this.skipNum ) {
          tempArray.push(i)
        }
        //this.arrayPush(this.tempArray, i)
      }
      
      //move prio to start
      // if (this.prioBool === true){
      //   //this.arrayPriority(this.tempArray, this.prioNum)
      //   tempArray.splice( tempArray.indexOf(this.prioNum),1)
      //   tempArray.unshift(this.prioNum)
      // }
      //console.log('tempArray built:',this.tempArray);
      return tempArray;
    },

    ...mapGetters({
      trackAllBlanks: 'trackAllBlanks',
      trackExists: 'trackExists',
      tracklistData: 'trackData',
      totalTrackers: 'trackTotal',
      trailIsActive: 'trackIsActive',
    })
    // END OF COMPUTED //
  },

  watch: {
    topdown: function () {
      //watches a toggle prop to move the first trail down
      this.TrailArrayTopDown();
    },
    totaltohighest: function () {
      //watches a toggle prop to update the trackTotal variable
      this.updateTotalToHighest();
    },
    baseArray: function () {
      this.TrailArraySetToDefault();
    },
  },

  methods: {
    ReorderUp() {
      for (var track = 1; track <= this.totalTrackers; track++) {
        //if the track is blank and is not undefined
        if(this.trackAllBlanks(track) === true && typeof(this.tracklistData[track]) !== undefined) {
          //track is blank. Finding good track...
          for (var newTrack = track + 1; newTrack <= this.totalTrackers; newTrack++) {
            if (this.trackAllBlanks(newTrack) !== true && this.trackExists(newTrack)) {
              // REPLACE track WITH newTrack //

              var executed = false;
              if (!executed) {
                this.trackOverwrite({
                  trackToClone: newTrack, 
                  trackToKill: track
                })
                executed = true;
              }
              break
            }
          }
        }
      }
    },

    PruneEnd () {
      for (var track=1; track<= this.totalTrackers; track++) {
        if (this.trackAllBlanks(track) === true && this.trackExists(track) === true) {
          this.setTrack(track-1)
          break
        }
      }
    },

    TrailArraySetToDefault () {
      this.trailArray = this.baseArray
    },

    TrailArrayTopDown () {
      var tempKey = this.trailArray.shift()
      this.trailArray.push(tempKey)
    },

    updateTotalToHighest () { //sets trackTotal in store to highest number in array
      this.$store.dispatch(
        'setTrack',
        Math.max.apply(null, this.trailArray)
      );
    },




    // arrayPush(targetArray, info) {
    //   //targetArray.push(info)
    //   if ( info != this.skipNum ) {
    //     targetArray.push(info)
    //   }
    // },

    // arrayPriority(targetArray, priority) {
    //   targetArray.splice (targetArray.indexOf(priority), 1)
    //   targetArray.unshift(priority)
    // },

    ...mapActions({
      trackOverwrite: 'TrackOverwrite',
      trackDelete: 'TrackDelete',
      setTrack: 'setTrack',
    })
  }


  
}

</script>