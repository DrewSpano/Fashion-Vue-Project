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
        <v-row justify="center" align="center">
      <!-- Item Description -->
        <v-col cols=5>
        <v-text-field
          :disabled=isEditable
          label="site description"
          hint="A short description or reminder of what to look for at this website"
          class="mx-1"
          v-model="trackDescription"
        />
        </v-col>

        <v-col cols=5>
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
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {

  created() {
    //if the track is undefined, set it equal to a blank object
    //this.$store.commit('TrackCreate', this.num)
    this.$store.dispatch('TrackCreate', this.num)
  },
  
  mounted() {
    //if all the inputs are filled, disable fields
    if (this.$store.getters.trackAllFilled(this.num) === true) {
      this.isEditable = true;
    }
  },

  destroyed() {},

  name: 'track',
  
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
        return this.getFieldInfo(this.trackNumber, 'name')
      },
      set: function (value) {
        this.setFieldInfo({
          number: this.trackNumber,   //the track ID
          name: 'name',               //the track Field
          value: value                //the content of the field
        })
      }
    },

    //TRACK LINK
    trackLink: {
      get: function () {
        return this.getFieldInfo(this.trackNumber, 'link')
      },
      set: function (value) {
        this.setFieldInfo({
          number: this.trackNumber,
          name: 'link',
          value: value
        })
      }
    },

    //TRACK DESC.
    trackDescription: {
      get: function () {
        return this.getFieldInfo(this.trackNumber, 'description')
      },
      set: function (value) {
        this.setFieldInfo({
          number: this.trackNumber,
          name: 'description',
          value: value
        })
      }
    },

    //TRACK DAY
    trackDay: {
      get: function () {
        return this.getFieldInfo(this.trackNumber, 'day')
      },
      set: function (value) {
        this.setFieldInfo({
          number: this.trackNumber,
          name: 'day',
          value: value
        })
      }
    },

    //TRACK TIME
    trackTime: {
      get: function () {
        return this.getFieldInfo(this.trackNumber, 'time')
      },
      set: function (value) {
        this.setFieldInfo({
          number: this.trackNumber,
          name: 'time',
          value: value
        })
      }
    },

    //TRACK AMPM
    trackAMPM: {
      get: function () {
        return this.getFieldInfo(this.trackNumber, 'ampm')
      },
      set: function (value) {
        this.setFieldInfo({
          number: this.trackNumber,
          name: 'ampm',
          value: value
        })
      }
    },
    
    trackTags: {
      get: function () {
        return this.getFieldInfo(this.trackNumber, 'tags')
      },
      set: function (value) {
        this.setFieldInfo({
          number: this.trackNumber,
          name: 'tags',
          value: value
        })
      }
    },
    
    ...mapGetters({
      getFieldInfo: 'trackFieldInfo',
    }),
    // END OF COMPUTED //
  },

  props: {
    num: {
      type: Number,
      required: true,
    }
  },

  methods: {
    TrackClear() {
      this.$store.dispatch('TrackClear', this.trackNumber)
    },

    ...mapActions({
      setFieldInfo: 'UpdateInfo',
    })
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