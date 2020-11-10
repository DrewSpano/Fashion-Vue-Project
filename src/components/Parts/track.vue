<template>
  <v-container fluid>
    <v-divider/>
    <v-row
      no-gutters
      justify="space-between"
      align="center"
    >
      <!-- Item Number -->
      <span class="sub"> 
        # {{trackNumber}} 
      </span> 

      <!-- Item Name -->
      <v-col cols=2
        v-show="trackMore">
        <v-text-field
          v-show="trackMore"
          :disabled="isEditable"
          label="site name"
          hint="Example: Palace"
          class="mx-1"
          v-model="trackName"
        />
      </v-col>

      <v-col cols=3
          v-show="trackMore">
      <!-- Item Link -->
        <v-text-field
          :disabled=isEditable
          label="site link"
          hint="Example: palaceskateboards.com"
          class="mx-1"
          v-model="trackLink"
        />
      </v-col>


      <!-- Item Time Slots -->
      <v-col cols="5"
          v-show="trackMore">
        <v-row
          no-gutters
          justify="center"
          align="center"
        > 
          <v-col cols=1>
            <span>every:</span>
          </v-col>
          
          <!-- Item Day -->
          <v-col>
            <v-overflow-btn
              :disabled=isEditable
              dense
              :items="days"
              editable
              class="mx-1"
              v-model="trackDay"
            />
          </v-col>
          
          <!-- Item Hour -->
          <v-col cols = 3>
            <v-overflow-btn
              :disabled=isEditable
              dense
              editable
              :items="times"
              class="mx-1"
              v-model="trackTime"
            />
          </v-col>

          <!-- Item AM/PM -->
          <v-col cols = 3>
            <v-overflow-btn
              :disabled=isEditable
              dense
              editable
              :items="listampm"
              v-model="trackAMPM"
            />
          </v-col>

        </v-row>
      </v-col>

      <!-- Hidden through v-show -->
      <v-col v-show="!trackMore">
        <v-row no-gutters>
      <!-- Item Description -->
        <v-col>
        <v-text-field
          :disabled=isEditable
          label="site description"
          hint="A short description or reminder of what to look for at this website"
          class="mx-1"
          v-model="trackDescription"
        />
        </v-col>

        <v-col>
          <v-text-field
            :disabled=isEditable
            label="tags"
            hint="Genres or types of products. Separate with a comma: 'tag 1, tag 2'"
            class="mx-1"
            v-model="trackTags"
          />
        </v-col>
        </v-row>
      </v-col>


      <!-- Buttons -->
      <v-col cols = 1>
        <!-- Item Edit -->
        <v-btn
          block
          tile
          color="success"
          @click= "isEditable = !isEditable"
        > {{isEditable ? 'unlock' : 'lock'}}
        </v-btn>

        <!-- Item Next -->
        <v-btn
          block
          tile
          color="red"
          @click = "trackMore = !trackMore"
        > {{trackMore ? 'more' : 'back'}}
        </v-btn>

        <!-- TRACK CLEAR -->
        <v-btn
          block
          tile
          color = "success"
          @click="TrackClear()"
          
          :disabled = "isEditable"
        >clear </v-btn>
      </v-col>
      
      

    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    //if all the inputs are filled
    if (this.$store.state.tracklistData.allFilled(this.num) === true) {
      console.log('track', this.num, 'is all filled. disabling fields');
      this.isEditable = true;
    }
  },
  
  components: {
  },

  data: function () {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      times: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      listampm: ['am','pm'],
      isEditable: false,
      trackMore: true,
      trackNumber: this.num,
    }
  },

  computed: {
    trackName: {
      get: function () {
        //define the path that the object should exist in
        //edit 'name' for other items
        const fullpath = this.$store.state.tracklistData[this.trackNumber]['name']
        //if fullpath exists, return the info
        if (typeof fullpath != "undefined") { return fullpath }
        //if it doesn't exist, create it
        else {
          // const path is the info that will be sent to the store
          //edit 'name' for other items
          const path = {
            name: 'name',
            number: this.trackNumber
          }
          //CreateInfo in store sets tracklistData.number.name = ""
          this.$store.commit('CreateInfo', path)
          //return the blank info
          return fullpath
        }
      },
      set: function (value) {
        //the payload to be sent to the store in order to be saved
        //edit 'name' for other items
        const payload = {
          name: 'name',
          number: this.trackNumber,
          //value is the new value inside the text box
          value: value
        }
        //commits info to store
        this.$store.commit('UpdateInfo', payload)
      }
    },

    //TRACK LINK
    trackLink: {
      //look at TRACK NAME for comments
      get: function () {
        //edit final item
        const fullpath = this.$store.state.tracklistData[this.trackNumber]['link']
        if (typeof fullpath != "undefined") { return fullpath }
        else {
          // edit name
          const path = {
            name: 'link',
            number: this.trackNumber
          }
          this.$store.commit('CreateInfo', path)
          return fullpath
        }
      },
      set: function (value) {
        //edit name
        const payload = {
          name: 'link',
          number: this.trackNumber,
          value: value
        }
        this.$store.commit('UpdateInfo', payload)
      }
    },

    //TRACK DESC.
    trackDescription: {
      //look at TRACK NAME for comments
      get: function () {
        //edit final item
        const fullpath = this.$store.state.tracklistData[this.trackNumber]['description']
        if (typeof fullpath != "undefined") { return fullpath }
        else {
          // edit name
          const path = {
            name: 'description',
            number: this.trackNumber
          }
          this.$store.commit('CreateInfo', path)
          return fullpath
        }
      },
      set: function (value) {
        //edit name
        const payload = {
          name: 'description',
          number: this.trackNumber,
          value: value
        }
        this.$store.commit('UpdateInfo', payload)
      }
    },

    //TRACK DAY
    trackDay: {
      //look at TRACK NAME for comments
      get: function () {
        //edit final item
        const fullpath = this.$store.state.tracklistData[this.trackNumber]['day']
        if (typeof fullpath != "undefined") { return fullpath }
        else {
          // edit name
          const path = {
            name: 'day',
            number: this.trackNumber
          }
          this.$store.commit('CreateInfo', path)
          return fullpath
        }
      },
      set: function (value) {
        //edit name
        const payload = {
          name: 'day',
          number: this.trackNumber,
          value: value
        }
        this.$store.commit('UpdateInfo', payload)
      }
    },

    //TRACK TIME
    trackTime: {
      //look at TRACK NAME for comments
      get: function () {
        //edit final item
        const fullpath = this.$store.state.tracklistData[this.trackNumber]['time']
        if (typeof fullpath != "undefined") { return fullpath }
        else {
          // edit name
          const path = {
            name: 'time',
            number: this.trackNumber
          }
          this.$store.commit('CreateInfo', path)
          return fullpath
        }
      },
      set: function (value) {
        //edit name
        const payload = {
          name: 'time',
          number: this.trackNumber,
          value: value
        }
        this.$store.commit('UpdateInfo', payload)
      }
    },

    //TRACK AMPM
    trackAMPM: {
      //look at TRACK NAME for comments
      get: function () {
        //edit final item
        const fullpath = this.$store.state.tracklistData[this.trackNumber]['ampm']
        if (typeof fullpath != "undefined") { return fullpath }
        else {
          // edit name
          const path = {
            name: 'ampm',
            number: this.trackNumber
          }
          this.$store.commit('CreateInfo', path)
          return fullpath
        }
      },
      set: function (value) {
        //edit name
        const payload = {
          name: 'ampm',
          number: this.trackNumber,
          value: value
        }
        this.$store.commit('UpdateInfo', payload)
      }
    },
    
    trackTags: {
      //look at TRACK NAME for comments
      get: function () {
        //edit final item
        const fullpath = this.$store.state.tracklistData[this.trackNumber]['tags']
        if (typeof fullpath != "undefined") { return fullpath }
        else {
          // edit name
          const path = {
            name: 'tags',
            number: this.trackNumber
          }
          this.$store.commit('CreateInfo', path)
          return fullpath
        }
      },
      set: function (value) {
        //edit name
        const payload = {
          name: 'tags',
          number: this.trackNumber,
          value: value
        }
        this.$store.commit('UpdateInfo', payload)
      }
    },
    
    // END OF COMPUTED //
  },

  props: [
    'num',
  ],

  methods: {
    TrackUpdate (payload) {
      this.$store.commit('TrackUpdate', payload)
    },

    TrackClear() {
      this.$store.commit('TrackClear', this.trackNumber)
    }
    // END OF METHODS //
  },
}
</script>

<style scoped>
  .profname {
    font-size: 50px
  }
  .sub {
    font-size:20px
  }
</style>