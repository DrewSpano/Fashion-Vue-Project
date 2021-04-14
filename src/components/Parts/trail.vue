<template>
  <v-card outlined>
    <v-container fluid>
      <v-row no-gutters align="end" v-if="trailExists">
        <v-col>
          <v-card-title>
            {{name}} 
          </v-card-title>

          <v-card-subtitle>
            {{link}}, {{day +" @ "+ time + ' ' + ampm}} <br/>
            {{tags}}
          </v-card-subtitle>

          <v-card-text>
            {{description}}
          </v-card-text>

          <v-card-actions>
            <v-btn small @click="followLink()" :color="checkedColor"> follow link </v-btn>
            <v-btn small  @click="checked = !checked"> Checked? </v-btn>
            <v-btn small @click="TrackToggleActive(num)"> dismiss </v-btn>
          </v-card-actions>
        </v-col><v-divider vertical />

        <v-col align-self="center">
          <v-img
          src="https://www.liveabout.com/thmb/prRidJBUyT8DWQV5UCLqZPbS1x4=/1137x853/smart/filters:no_upscale()/broken_skateboard_106650481-56a878483df78cf7729e3229.jpg"
          max-height="250"
          max-width="250"
          >
          </v-img>
        </v-col>

      </v-row>

      <v-row no-gutters align="center" v-if="!trailExists">
        <v-col>
          Error: trail {{this.num}} doesn't exist
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: function() {
    return{
      checked: false,
      trailNumber: this.num,
    }
  },
  props: [
    'num',
  ],
  computed: {
    trailExists: function() {
      return this.exists(this.trailNumber)
    },
    active: function() {
      return this.trailData(this.trailNumber, 'active')
    },
    name: function() {
      return this.trailData(this.trailNumber, 'name')
    },
    link: function() {
      return this.trailData(this.trailNumber, 'link')
      // return "hi"
    },
    day: function() {
      return this.trailData(this.trailNumber, 'day')
    },
    time: function() {
      return this.trailData(this.trailNumber, 'time')
    },
    ampm: function() {
      return this.trailData(this.trailNumber, 'ampm')
    },
    tags: function() {
      return this.trailData(this.trailNumber, 'tags')
    },
    description: function() {
      return this.trailData(this.trailNumber, 'description')
    },
    checkedColor: function() {
      let color = this.checked ? '#3EB489' : ''
      return color
    },

    ...mapGetters('GeneralStore',{
      getTrailData: 'trailFieldInfo',
      exists: 'trackExists'
    }),
  },

  methods: {
    testname() {
      return this.$store.state.GeneralStore.tracklistData[this.trailNumber]['name']

    },

    followLink() {
      this.checked = !this.checked;
      window.open('//' + this.trailData(this.num, 'link'))
    },

    trailData(trailNumber, field) {
      return this.getTrailData({trailNumber, field})
    },

    ...mapActions('GeneralStore',{
      TrackToggleActive: 'TrackToggleActive'
    })
  }
}
</script>