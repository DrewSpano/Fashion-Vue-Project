export default {

  
  UserLoginUpdate(context, userID) {
    // if (context.state.users !== undefined) {
        context.commit('USER_SET_LOGIN_ID', userID)
    // }
  },
    UserCreate(context, {email, username}) {
    console.log('cum')
    //get a random number (usually 4 digits), make sure that it's not already used
    let newID;
    do {newID = Math.floor(Math.random() * 10000)}
    while (context.state.users[newID] !== undefined)
    //set users.newid = {name:name email: email}
    context.commit('USER_ID_SET', {id:newID, payload:{'name': username, 'email': email, 'tracks': []}})

    // console.log(`Creating new User with ID ${newID}`);
    // context.commit('USER_CREATE_NEW_ID', newID);
    // console.log(`Setting ${newID}'s email to ${email}`)
    // context.commit('USER_SET_ID_INFO',{id: newID, info:'email', payload: email});
    // console.log(`Setting ${newID}'s name to ${username}`)
    // context.commit('USER_SET_ID_INFO',{id: newID, info:'name', payload: username});
    // context.commit('USER_INIT_TRACKS', newID)
    context.commit('USERSIDS_ADD', newID);
    },

  UserIDsSync({state, commit}) {
    for (let user in state.users) {
        if (state.usersIDs.indexOf(parseInt(user)) === -1){
            // state.usersIDs.push(parseInt(user))
            commit('USERSIDS_ADD', user)
        }
    }
  },

  UserAddTracks({commit}, {id, tracks}) {
      for (let track of tracks) {
          commit('USER_ADD_TRACK',{id, track})
      }
  },

  
}