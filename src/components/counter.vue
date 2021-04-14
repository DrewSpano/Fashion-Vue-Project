<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col  lg=7 sm=12>
        <v-sheet
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          This is Blog! Check this whenever you want news/info about the site

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script>
export default{
  methods: {
  },
  computed: {
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