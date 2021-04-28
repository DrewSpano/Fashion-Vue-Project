<template>
  <v-container fluid>
    <v-divider/>
    <v-row
      no-gutters
      justify="space-between"
      align="center"
    >
      <!-- Item Number -->
      <span class="sub" @click="testMethod()"> 
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


      <!-- ############### Buttons ################### -->
      <v-col cols = 1>
        <v-row no-gutters>
          <v-col cols = 6>
            <!-- Item Edit -->
            <v-btn
              block
              tile
              color="success"
              @click="editOrSave()"
            > 
              {{isEditable ? 'edit' : 'save'}}
            </v-btn>
          </v-col>
          <v-col cols = 6>
            <!-- Item Next -->
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols = 6>
            
            <v-btn
              block
              tile
              color="red"
              @click = "trackMore = !trackMore"
            > 
              {{trackMore ? 'more' : 'back'}}
            </v-btn>
            <!-- TRACK CLEAR -->
            <!-- <v-btn
              block
              tile
              color = "success"
              @click="TrackClear()"
              :disabled = "isEditable"
            >
              clear 
            </v-btn> -->
          </v-col>
          <v-col cols = 6>
            <!-- <v-btn
              block
              tile
              @click="TrackUpdate(trackObj)"

            >
              {{updateType}}
            </v-btn> -->
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  created() {
    this.TrackCreate(this.num)
    this.initFieldInfo({trackNumber: this.num})
    .then ( () => { this.localStateUpdate() })
    .catch( error => {
      console.log('catch')
      //if 404, we use POST instead of PUT
      if (error.response.status === 404) {
        console.log('info not found, making sure we know.')
        this.updateTypeToPost();
      }
      else if (error.response === undefined) {
        console.log('no server response')
      }
      else {
        console.log("UNCAUGHT ERROR:",error)
      }
    })
  },

  name: 'track',

  data: function () {
    return {
      updateType: 'put',

      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      times: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      listampm: ['AM','PM'],
      isEditable: undefined,
      trackMore: true,
      trackNumber: this.num,

      
      trackName: "",
      trackLink: "",
      trackDescription: "",
      trackDay: "",
      trackTime: "",
      trackAMPM: "",
      trackTags: "",
    }
  },

  computed: {
    trackObj: function () {
      return {
        id: this.trackNumber,
        trackName: this.trackName,
        trackLink: this.trackLink,
        trackDescription: this.trackDescription,
        trackDay: this.trackDay,
        trackTime: this.trackTime,
        trackAMPM: this.trackAMPM,
        trackTags: this.trackTags
      }
    },
    // OLD FUNCTIONALITY FOR GET/SET FIELD VALUES
    // trackName: {
    //   get: function () {
    //     return this.getFieldInfo(this.trackNumber, 'name')
    //   },
    //   set: function (value) {
    //     this.setFieldInfo({
    //       number: this.trackNumber,   //the track ID
    //       name: 'name',               //the track Field
    //       value: value                //the content of the field
    //     })
    //   }
    // },

    ...mapGetters('Tracks', {
      tracks: 'allTracks',
      trackAllFilled: 'trackTruthy'
    })
    // END OF COMPUTED //
  },

  props: {
    num: {
      type: Number,
      required: true,
    }
  },

  methods: {

    //used in created() to make code there more succinct
    localStateUpdate() {
      this.fieldUpdate()
      if (this.trackAllFilled(this.trackNumber) === true) {
        this.isEditable = true;
      }
    },
    
    // this method handles the save functionality.
    // it will toggle editability and, when making fields uneditable,
    // it also saves info to the DB ######editable true = uneditable
    editOrSave(){
      //if currently uneditable, click should allow edits
      if (this.isEditable) {
        this.isEditable = !this.isEditable
      }
      //if currently editable, click should disable edits and save. 
      else if (!this.isEditable){
        console.log('clicked while editable. disabling edits')
        this.isEditable = !this.isEditable
        this.TrackUpdate(this.trackObj)
      }
    },

    // handles wether to POST or PUT
    updateTypeToPost(){
      console.log('fieldUpdateType called')
      this.updateType = 'post';
      console.log(this.updateType)
    },

    // sets the local state equal to the vuex state
    fieldUpdate(){
      const track = this.tracks[this.trackNumber]
      this.trackName = track.trackName
      this.trackLink = track.trackLink
      this.trackDescription = track.trackDescription
      this.trackDay = track.trackDay
      this.trackTime = track.trackTime
      this.trackAMPM = track.trackAMPM
      this.trackTags = track.trackTags
    },

    TrackUpdate(trackObj) {
      //update the vuex state
      this.setTrack( {
        id: this.trackNumber,
        track: trackObj, 
        listUpdate: false
      })
      //call POST
      if (this.updateType === 'post') {
        this.postTrack(trackObj)}
      //call PUT
      else if (this.updateType === 'put') {
        this.putTrack(trackObj)
      }
    },

    TrackClear() {
        this.TrackClear(this.trackNumber)
    },

    ...mapActions('Tracks', {
      TrackClear: 'setTrackBlank',
      initFieldInfo: 'initFieldInfo',
      TrackCreate: 'trackCreate',
      setTrack: 'setTrack', 
      postTrack: 'postTrack',
      putTrack: 'putTrack',
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