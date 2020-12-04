<template>
  <v-card outlined>
    <v-container fluid>
      <v-row no-gutters align="end" v-if="trailExists">
        <v-col>
          <v-card-title>
            {{name}}, {{active}}
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
          
          probably putting an image here? <br/>
          Some stock images for now would be pretty cool.
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
    }
  },
  props: [
    'num',
  ],
  computed: {
    trailExists: function() {
      return this.exists(this.num)
    },
    active: function() {
      return this.trailData(this.num, 'active')
    },
    name: function() {
      return this.trailData(this.num, 'name')
    },
    link: function() {
      return this.trailData(this.num, 'link')
    },
    day: function() {
      return this.trailData(this.num, 'day')
    },
    time: function() {
      return this.trailData(this.num, 'time')
    },
    ampm: function() {
      return this.trailData(this.num, 'ampm')
    },
    tags: function() {
      return this.trailData(this.num, 'tags')
    },
    description: function() {
      return this.trailData(this.num, 'description')
    },
    checkedColor: function() {
      let color = this.checked ? '#3EB489' : ''
      return color
    },

    ...mapGetters({
      trailData: 'trailFieldInfo',
      exists: 'trackExists'
    }),
  },

  methods: {
    followLink() {
      this.checked = !this.checked;
      window.open('//' + this.trailData(this.num, 'link'))
    },

    ...mapActions({
      TrackToggleActive: 'TrackToggleActive'
    })
  }
}
</script>