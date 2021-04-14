export default {
  //basic state returners
  users: (state) => state.users,
  user: (state) => state.thisUser,
  info: (getters) => getters.users[getters.thisUser],     //If this is changed, check the status of 'test' getter below
  name: (getters) => getters.users[getters.thisUser].name,
  tracks: (getters) => getters.users[getters.thisUser].tracks,
  totalTracks: (getters) => getters.users[getters.thisUser].tracks.length,

  userTracksTruthy: (getters) => getters.tracks ? true : false,
  userTracksIfExists: (getters) => getters.userTracksTruthy ? getters.tracks : "doesn't exist",

  
  test: (getters) => getters.info,      //used to show an example of this returning as undefined
}