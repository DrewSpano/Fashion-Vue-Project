const getDefaultState = () => {
    return{
      username: "Andwerrrrr",
      thisUser: 1234,           //ID for users prop
      loginState: false,
      totalTrackers: 0,
      users:{
        1234:{name: 'spandrew', tracks: [1,2]},
        4567:{name: 'Andwer', tracks: [1,3]}
      },
      usersIDs: [1234, 4567],
  
      tracklistData: {
        //id: {... },
        //1: {name: 'Palace',... },
      },
      //array of tracklistData IDs for easy sorting
      tracklistIDs: [],    //[1,2,3,... ]
    }
  }

export default{
    TOTAL_RESET: state => Object.assign(state, getDefaultState()),
        
    TOTALTRACKERS_RESET: state => state.totalTrackers = 0,
    logTrue: state => state.loginState = true,
    logFalse: state => state.loginState = false,
    addTrack: state => state.totalTrackers++,
    delTrack: state => state.totalTrackers--,

    DATA_RESET: state => state.tracklistData = {1:{}},

    //targetTrack is always an integer equal to the track's ID
    TrackCreate(state, targetTrack) {
        state.tracklistData[targetTrack] = {}
    },

    TrackDelete(state, targetTrack) {
        delete state.tracklistData[targetTrack];
    },

    TrackCloneIntoLast(state, targetTrack) {
        state.tracklistData[state.totalTrackers] = state.tracklistData[targetTrack];
    },

    TrackCloneIntoTarget(state, payload) {
        console.log('ERROR: TrackCloneIntoTarget called in vuex mutations. use TrackOverwrite instead.')
        const {item1, item2} = payload;
        state.tracklistData[item1] = state.tracklistData[item2];
    },

    TrackOverwrite(state, payload) {
        const {trackToClone, trackToKill} = payload;
        state.tracklistData[trackToKill] = state.tracklistData[trackToClone];
    },

    TrackEqualToObject(state, payload) {
        const {target, trackObject} = payload;
        state.tracklistData[target] = trackObject;
    },

    //Sets active state to inactive. Also used to create the active state info
    //active state is used for trail rendering
    TRACK_SET_INACTIVE(state, targetTrack) {
        state.tracklistData[targetTrack].active = false;
    },
    TRACK_SET_ACTIVE(state, targetTrack) {
        state.tracklistData[targetTrack].active = true;
    },

    //Creates a new space for information to be saved. needs number and field to create the info. 
    CreateInfo(state, payload) {
        state.tracklistData[payload.number][payload.field] = ""
    },

    //UpdateInfo updates a track field. Called from computed set. Needs number, name, and value. 
    UpdateInfo(state, payload) {
        state.tracklistData[payload.number][payload.name] = payload.value;
    },

    TRACKID_ADD(state, id) {
        state.tracklistIDs.push(id)
    },
    TRACKID_DEL(state, id) {
        state.tracklistIDs.splice(state.tracklistIDs.indexOf(id),1)
    },

    USER_DATA_RESET (state) {
        console.log('user data reset, dont use this')
        delete state.users;
        state.usersIDs = [1234, 4567];
        state.thisUser = 1234
    },
    USER_DATA_DELETE_ALL (state) {
        delete state.users;
        state.usersIDs = [];
        state.thisUser = 1234
    },
    USER_CREATE_NEW_ID (state, id) {
        state.users[id] = {}
    },
    USER_SET_ID_INFO (state, {id, info, payload}) {
        state.users[id][info] = payload
    },
    USER_INIT_TRACKS (state, id) {
        state.users[id].tracks = []
    },
    USER_ADD_TRACK (state, {id, track}) {
        state.users[id].tracks.push(track)
    },
    USER_SET_LOGIN_ID (state, id) { 
        state.thisUser = id; 
    },
    USERSIDS_ADD (state,id) {
        state.usersIDs.push(parseInt(id))
    },


    //testo
    //maybe replace with trackequaltoobject
    testUpdateTrack(state, {newTrackID, newTrack}) {
        state.tracklistData[newTrackID] = newTrack
        console.log(state.tracklistData[newTrackID])
    }

    // END OF MUTATIONS //
}