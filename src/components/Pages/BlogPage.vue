<template>
  <div>
    <Track :num='0'/>
    TRACK ZERO: {{this.$store.state.tracklistData[0]}}<br/>
    <v-btn @click="trackNumber++">++ track </v-btn> <v-btn @click="trackNumber--">-- track </v-btn> <br/>
    TRACK {{trackNumber}}: {{this.$store.state.tracklistData[trackNumber]}}
  </div>
</template>

<script>
import Track from '../Parts/track'
export default {
  components: {
    Track
  },

  data: function() {
    return {
      trackNumber:1,
    };
  },
}
</script>