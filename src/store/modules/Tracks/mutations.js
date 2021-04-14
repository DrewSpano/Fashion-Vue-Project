export default {
  TRACK_SET(state, {id, track}) {
    state.tracks[id] = track
  },
  TRACK_SET_BLANK(state, id) {
    state.tracks[id] = {}
  },
  TRACK_DELETE(state, id) {
    delete state.tracks[id]
  },
  /*       tracklist mutations   */
  /////////////////////////////////
  TRACKLIST_ADD(state, id) {
    state.trackList.push(id)
  },
  TRACKLIST_DEL(state, id) {
    state.trackList.splice(state.trackList.indexOf(id), 1)
  }
}