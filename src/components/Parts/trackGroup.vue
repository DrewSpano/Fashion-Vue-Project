<template>
  <v-container fluid>
    <span v-if="debug">DEBUG: Array: {{trailArray}} | userID: {{userID}} | total tracks: {{this.$store.getters["Tracks/trackTotal"]}}</span>
    <span v-if="arrayNum !== null && arrayNum === []"> ERROR: IMPORTING AN EMPTY ARRAY </span>
    
    <v-row 
      no-gutters 
      justify="center"
      v-for="n in trailArray"
      :key = n
    > 
    <Track :num='n' v-if="showtrack"/>
    <Trail :num='n' v-if="showtrail"/>
    </v-row>


  </v-container>
</template>

<script>
import Track from './track';
import Trail from './trail';
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    console.log('totalTrackers:',this.$store.getters["Tracks/trackTotal"])
    //reorder tracks
    // this.ReorderUp();
    // //remove unused tracks
    // this.PruneEnd();
    // //set up group's array
    this.TrailArraySetToDefault();
  },

  destroyed() {
    // this.ReorderUp();
    // this.PruneEnd();
    this.TrailArraySetToDefault();
  },

  components: {
    Track,
    Trail
  },

  props: {
    totaltohighest: {type:Boolean},
    debug: {
      type: Boolean,
      default: false
    },
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
      default: -1,
      //Want to set the default as total trackers, but don't think I can...
      //So instead I'm setting this as required.
      //default: this.$store.getters.trackTotal
      // required: true
    },
    arrayNum:{
      default: null
    },

    userID: {
      type: Number
    },

    skipNum: Number,
    prioNum: Number,
  },
  
  data() {
    return {
      //trailArray is an array of integers that tells the page what order to display tracks or trails in
      //It uses the computed baseArray as its default, and there are methods that mutate trailArray
      trailArray: [],
    }
  },

  computed: {
    //makes an array based off either the imported array or
    //the first and last numbers
    //trailArray is always set to baseArray
    baseArray: function ()  {
      let tempArray = [];
      //arrayNum is a prop that can be passed in to get a desired number of tracks. 
      //if prop arrayNum isn't null, return arrayNum. this basically checks if we have any specific arrays we want to display.
      if (this.arrayNum !== null) { return this.arrayNum }
      //arrayNum is null. Now check the user stuff.
      //if the userID isn't null, then pass the user's tracks as our ID
      else if (this.userID !== null) { 
        return this.givenTracks(this.userID)}
      //just in case we pass in the userID as a prop & it's null or undefined, console log and return an empty array
      else if (this.userID === null || this.userId === undefined) { 
        console.log('null or undef userID passed in trackGroup')
        return [] }

      //if neither array nor user, use first/last num
      //defaults for first and last num are 1 and -1
      for (var i=this.firstNum; i<=this.lastNum; i++) {
        if ( i !== this.skipNum ) {
          tempArray.push(i)
        }
      }
      return tempArray;
    },

    ...mapGetters('Tracks', {
      trackAllBlanks: 'trackFalsy',
      trackExists: 'trackTruthySimple',
      tracklistData: 'allTracks',
      totalTrackers: 'trackTotal',
    }),

    ...mapGetters('Users', {
      givenTracks: 'givenTracks',
      test2: 'test2'
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
    // we are no longer doing the bulk of organization through the trackGroup,
    //so these methods are pretty much pointless. I have them commented out
    //to be sure that they do not accidentally get used.

    // ReorderUp() {
    //   for (var track = 1; track <= this.totalTrackers; track++) {
    //     //if the track is blank and is not undefined
    //     if(this.trackAllBlanks(track) === true && typeof(this.tracklistData[track]) !== undefined) {
    //       //track is blank. Finding good track... not blank and track exists
    //       for (var newTrack = track + 1; newTrack <= this.totalTrackers; newTrack++) {
    //         if (this.trackAllBlanks(newTrack) !== true && this.trackExists(newTrack)) {
    //           // REPLACE track WITH newTrack //

    //           var executed = false;
    //           if (!executed) {
    //             this.trackOverwrite({
    //               trackToClone: newTrack, 
    //               trackToKill: track
    //             })
    //             executed = true;
    //           }
    //           break
    //         }
    //       }
    //     }
    //   }
    // },

    // PruneEnd () {
    //   for (var track=1; track<= this.totalTrackers; track++) {
    //     if (this.trackAllBlanks(track) === true && this.trackExists(track) === true) {
    //       this.setTrack(track-1)
    //       break
    //     }
    //   }
    // },

    TrailArraySetToDefault () {
      //trailArray is in data, and baseArray is in computed
      //We edit trailArray to manipulate the order of the tracks, and use this to return it to normal
      this.trailArray = this.baseArray
    },

    TrailArrayTopDown () {
      var tempKey = this.trailArray.shift()
      this.trailArray.push(tempKey)
    },

    updateTotalToHighest () { //sets trackTotal in store to highest number in array
      this.setTrack(Math.max.apply(null, this.trailArray));
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

    ...mapActions('GeneralStore', {
      trackOverwrite: 'TrackOverwrite',
      trackDelete: 'TrackDelete',
      setTrack: 'setTrack',
    })
  }


  
}

</script>