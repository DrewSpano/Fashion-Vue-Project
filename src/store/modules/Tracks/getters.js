/* getters should include:
get track based off ID
basic returners for state
total tracks
get one individual track
get one field from an individual track


getters for the 'completion state' of tracks, both all tracks and individual tracks
    individual true/false
    all yes
    all no
    for:
      exists
      complete


*/
export default {
  //track
  allTracks: (state) => state.tracks,
  oneTrack: (state) => (id) => state.tracks[id],
  oneTrackField:(state) => ({id, field}) => state.tracks[id][field],
  fieldTruthy:(state) => ({id, field}) => {
    return state.tracks[id][field] ? true : false
  },
  trackTruthy:(state, getters) => (id) => {
    for (const i in state.tracks[id]){
      if (!getters.fieldTruthy({id, field: i})){
        return false
      }
    }
    return true
  },
  trackFalsy: (state, getters) => (id) => {
    for (const i in state.tracks[id]){
      if (getters.fieldTruthy({id, field: i})){
        return false
      }
    }
    return true
  },
  trackTruthySimple: (state) => (id) => {   //used to show if the track exists or not
    return state.tracks[id] ? true : false
  },
  //trackList
  trackList: (state) => state.trackList,
  trackTotal: (state) => state.trackList.length,
  trackListContainsID: (getters) => (id) => {
    return getters.trackList.includes(id)
  }



}