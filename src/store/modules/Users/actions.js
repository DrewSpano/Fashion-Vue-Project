export default {
  UserLogin({commit}, id){
    commit('USER_SET_LOGIN_ID',id)
  },

  UserCreate({state, commit}, {email, username}) {
  //get a random number (usually 4 digits), make sure that it's not already used
  let newID;
  do {newID = Math.floor(Math.random() * 10000)}
  while (state.users[newID] !== undefined)
  //set users.newid = {name:name email: email}
  commit('USER_ID_SET', {id:newID, payload:{'name': username, 'email': email, 'tracks': []}})
  //add user to list
  commit('USERSIDS_ADD', newID);
  },

  UserIDsSync({state, commit}) {
    for (let user in state.users) {
      if (state.userList.indexOf(parseInt(user)) === -1){
        // state.usersIDs.push(parseInt(user))
        commit('USERSIDS_ADD', user)
      }
    }
  },

  //multiple tracks in an array
  UserAddTrackArray({commit}, {id, tracks}) {
    for (let track of tracks) {
      commit('USER_ADD_TRACK',{id, track})
    }
  },

  UserAddTrack({commit}, {id, track}) {
    commit('USER_ADD_TRACK', {id, track})
  },

  UserRemoveTrack({commit, getters}, {id, track}) {
    if (getters.tracks.indexOf(track) > -1) {
      commit('USER_REMOVE_TRACK', {id, track})
    }
  }

  // UserLoginWithUsername({dispatch, getters}, username) {
  //   //user username to fetch id through getters
  //   //pass id to UserLogin
  // },

  
}