<template>
  <v-container fluid>
    <v-row 
      no-gutters 
      justify="center"
      v-for="n in this.$store.state.totalTrackers"
      :key="n"
    >
      <v-col  lg=9 sm=12>
        <v-sheet
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <v-row no-gutters justify="center">
            <v-col cols=10>
            <Trail :num="n"/>
            </v-col>
            <!--v-col cols=10>
              <v-skeleton-loader
              type="list-item-one-line, card-heading, image, actions"
            ></v-skeleton-loader>
            </v-col-->
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script>
import Trail from '../Parts/trail';
export default {
  components: {
    Trail
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