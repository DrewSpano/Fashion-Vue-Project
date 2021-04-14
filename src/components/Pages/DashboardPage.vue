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


          <v-row no-gutters justify="center">
            <v-col cols=10>
            <trackgroup
              :showtrail="true"
              :lastNum="$store.getters['Tracks/trackTotal']"
            />
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
import trackgroup from '../Parts/trackGroup';
export default {

  mounted(){
    console.log(this)
  },
  components: {
    trackgroup
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