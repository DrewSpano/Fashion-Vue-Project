<template>
  <v-container fluid>
    <v-row 
      no-gutters
      justify="center"
      align-content="start"
    >
      <v-col  lg=9 sm=12>

        <v-sheet 
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <v-row 
            no-gutters 
            align="center" 
            justify="center"
          >
            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            />
            <v-col cols="4">
              <span class="profname">{{$store.state.username}}'s Profile</span>
            </v-col>
            <v-col cols="2">
              <v-icon
                class="mx-9"
                size=60
                color='black'
              >
                mdi-cog
              </v-icon>
            </v-col>
            <v-col cols="5">
              <v-btn 
                x-large 
                block 
                height=80px
                link to="Tracklist"
              > 
                <span class="profname">Tracklist </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>

        <v-sheet
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <v-row no-gutters>
            <v-col>
              <span class="profname"> stats </span>
              <v-divider/>
                <v-list disabled color="#ffe4c4">
                  <v-list-item>Brands followed: [placeholder] </v-list-item>
                  <v-list-item>Date joined:   [placeholder num 2] </v-list-item>
                </v-list>
            </v-col>
            <v-divider vertical />

            <v-col>
              <span class="profname"> bio </span>
              <v-divider/>
              <v-textarea filled />
              Social Media links will go here
            </v-col>
          </v-row>
        </v-sheet>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    myUsername: String
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
</style>