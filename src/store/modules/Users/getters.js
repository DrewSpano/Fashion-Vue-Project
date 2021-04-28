export default {
  //basic state returners
  users: (state) => state.users,
  user: (state) => state.thisUser,
  info: (getters) => getters.users[getters.thisUser],     //If this is changed, check the status of 'test' getter below
  name: (getters) => getters.users[getters.thisUser].name,
  tracks: (getters) => getters.users[getters.thisUser].tracks,
  totalTracks: (getters) => getters.users[getters.thisUser].tracks.length,

  givenInfo: (getters) => (id) => {getters.users[id]},
  givenName: (getters) => (id) => {getters.users[id].name},
  givenTracks: (getters) => (id) => getters.users[id].tracks,
  givenTotalTracks: (getters) => (id) => {getters.users[id].tracks.length},


  userTracksTruthy: (getters) => getters.tracks ? true : false,
  userTracksIfExists: (getters) => getters.userTracksTruthy ? getters.tracks : "doesn't exist",

  userLoggedIn: (getter) => getter.user ? true : false,

  userList: (state) => state.userList,

  
  test: (getters) => getters.info,      //used to show an example of this returning as undefined
}