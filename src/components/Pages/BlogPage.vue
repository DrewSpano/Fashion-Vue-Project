<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col >

        <v-row>
          <v-col>
          <v-text-field label="start, inclusive" hint="put the first number here"  type="number" v-model="firstNum"/>
          </v-col>

          <v-col>
          <v-text-field label="end, inclusive" hint="put the second number here" type="number" v-model="lastNum"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols=6>
          <v-text-field label="a number to skip" hint="only one" type="number" v-model="skipNum"/> </v-col>
          <v-col cols=6>
          <v-text-field label="numbers to prioritize" hint="render these first" type="number" v-model="prioNum"/> </v-col>
        </v-row>

      </v-col>
      <v-divider vertical/>

      <v-col >
        <v-row no-gutters>
        <v-col>
          <v-checkbox label="render tracks" v-model="showtrack"/>
          <v-checkbox label="render trails" v-model="showtrail"/>
        </v-col>
        <v-col>
          <v-checkbox label="organize by time of day" color="red" disabled />
          <v-checkbox label="organize by priority" v-model="prioBool"/>
        </v-col>
        </v-row>
      </v-col>
      <v-divider vertical/>

      <v-col >
        <!-- only accessing state here for debugging purposes -->
        {{this.$store.state.tracklistData}}
      </v-col>
      <v-divider vertical />

      <v-col >
        <v-btn color="green" class="mx-1 my-1" @click="topdown = !topdown"> move top to bottom </v-btn>
        <v-btn color="red" class="mx-1 my-1"> move #2 up </v-btn>
        <v-btn color="blue" class="mx-1 my-1" @click="$store.dispatch('TrackDelete', undefined)"> delete undefined </v-btn>
        <v-btn color="purple" class="mx-1 my-1" @click="totaltohighest = !totaltohighest"> total to highest </v-btn>
        <v-btn color="yellow" class="mx-1 my-1" @click="$store.dispatch('TrackAllToActive')"> Activate Trails </v-btn>
      </v-col>
    </v-row>
    <v-divider/>


    <trackgroup 
      :topdown="topdown"
      :totaltohighest="totaltohighest"
      :showtrack="showtrack" 
      :showtrail="showtrail"
      :prioBool="prioBool"
      :firstNum="firstNumProp"
      :lastNum="lastNumProp"
      :skipNum="skipNumProp"
      :prioNum="prioNumProp"
    />


  </v-container>
</template>

<script>
import trackgroup from '../Parts/trackGroup'
export default {
  components: {
    trackgroup
  },

  data: function() {
    return {
      topdown:true, //trigger for method call in trackGroup. Moves first trail down.
      totaltohighest:true, //trigger for method call in trackGroup. Sets trackTotal to array's highest number
      showtrack:false,
      showtrail:false,
      prioBool: false,
      firstNum:1,
      lastNum:1,
      skipNum:-1,
      prioNum:-1,
    };
  },

  computed: {
    firstNumProp: function () {return Number(this.firstNum)},
    lastNumProp: function () {return Number(this.lastNum)},
    skipNumProp: function () {return Number (this.skipNum)},
    prioNumProp: function () {return Number (this.prioNum)},

  },
}
</script>