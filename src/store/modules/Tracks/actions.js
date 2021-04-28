import axios from 'axios';
export default {  
  /*           track.vue                           */
  ///////////////////////////////////////////////////
  initFieldInfo({dispatch, }, { trackNumber }){
    return new Promise((resolve, reject) => {
      dispatch('getOneTrackFromDB', trackNumber)
        .then (response => {
          console.log('cum', response)
          // console.log(response.data)
          dispatch('setTrack', {id: trackNumber, track: response.data})
          //update store from api
          //update local state
          //update editability based off the store
          // console.log(response.data)
          resolve (response)
        })
        .catch (error => {
          reject (error)
        })
    })
  },

  trackCreate({state, dispatch}, id) {
    if (state.tracks[id] === undefined){
      dispatch('setTrack', {id, track: {}})
      // TODO: used to set active state here for trails, take a look and decide if we're still doing that
    }
  },


  /*           tracks local                        */
  ///////////////////////////////////////////////////  
  setTrack({commit, dispatch}, {id, track, listUpdate = true}){
    commit('TRACK_SET', {id, track})
    if (listUpdate) { dispatch('updateTrackList', id) }    
  },

  setTrackBlank(commit, id) {
    commit('SET_TRACK_BLANK', id)
  },

  delTrack({commit, dispatch}, id){
    commit('TRACK_DELETE', id)
    dispatch('removeTracklistID', id)
  },
  
  /*              trackList                         */
  ////////////////////////////////////////////////////
  updateTrackList({getters, commit}, id) {
    //check current list vs the id... if returns false
    if (!getters.trackListContainsID(id)) {
      //add the ID
      commit('TRACKLIST_ADD', id)
    }
  },
  removeTracklistID({getters, commit}, id) {
    if (getters.trackListContainsID(id)) {
      commit('TRACKLIST_DEL', id)
    }
  },





  ////////////////////////////////////////////////////
  //controller actions

  //list
  //updates all tracks to the version that's present in the DB
  //does not change tracks that are present locally but not in the DB
  getAllTracksFromDB(context) {
    axios.get(context.state.url+'tracks/')
    .then((response) => {
      for (var entry in response.data) {
        context.dispatch('setTrack', {
          id: response.data[entry].id, 
          track: response.data[entry]
        })
      }
    })
  },

  //details
  //get a track from the DB using an ID, then set the local track equal to the db track
  updateOneTrackFromDB(context, trackID) {
    axios.get(context.state.url+'tracks/'+trackID)
    .then((response) => {
      context.commit('SET_ONE_TRACK', response.data)
    })
  },

  //details
  //just get the one track
  getOneTrackFromDB(context, trackID) {
    return new Promise ((resolve, reject) => {
      axios.get(context.state.url+'tracks/'+trackID)
      .then (response => {
        resolve (response)
      })
      .catch (error => {
        reject (error)
      })
    })
  },

  //delete
  //delete a db track, then the local track, based off an ID
  deleteTrack(context, trackID) {
    return new Promise ((resolve, reject) => {
      axios.delete(context.state.url+'tracks/'+trackID)
      .then (response => {
        context.commit('DELETE_TRACK', trackID)
        resolve(response)})
      .catch (error => {reject (error)})
    })

  },

  //edit
  //use information in the store to update the information in the db
  putTrack({state}, track) {
    return new Promise ((resolve, reject) => {
      console.log('i put')
      axios.put(state.url+'tracks/'+track.id, track)
      .then (response => {resolve (response)})
      .catch (error => {reject (error)})
    })
  },

  //create
  postTrack({state}, track) {
    return new Promise ((resolve, reject) => {
      axios.post(state.url+'tracks/', track)
      .then (response => {resolve (response)})
      .catch (error => {reject (error)})
    })
  }
}