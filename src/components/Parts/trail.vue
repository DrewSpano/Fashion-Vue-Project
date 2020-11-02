<template>
  <v-card outlined>
    <v-container fluid>
      <v-row no-gutters align="end">
        <v-col>
          <v-card-title>
            {{data[num].name}}
          </v-card-title>

          <v-card-subtitle>
            {{data[num].link}}, {{data[num].day +" "+ data[num].time + data[num].ampm}}
          </v-card-subtitle>

          <v-card-text>
            this is where the description should go.
          </v-card-text>

          <v-card-actions>
            <v-btn small @click="followLink()"> follow link </v-btn>
            <v-btn small> check later </v-btn>
            <v-btn small> dismiss </v-btn>
          </v-card-actions>
        </v-col><v-divider vertical />

        <v-col align-self="center">
          
          probably putting an image here?
        </v-col>

      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: [
    'num',
  ],
  computed: mapState({
    data: state => state.tracklistData,
  }),
  methods: {
    followLink() {
      window.open('//' + this.data[this.num].link)
    }
  }
}
</script>