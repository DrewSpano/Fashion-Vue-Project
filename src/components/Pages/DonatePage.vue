<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col  lg=9 sm=12>
        <v-sheet
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          This is Donate! come here to give me money :)
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script>
export default {
  data: function (){
    return{
    }
  },
  
  computed:{
  },
  // END OF COMPUTED //
    
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