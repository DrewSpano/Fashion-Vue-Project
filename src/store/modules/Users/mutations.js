const getDefaultState = () => {
    return{
        thisUser: -1,   //
        users: {
            1234:{name: 'spandrew', tracks: [1,2,10,4,5]},
            4567:{name: 'Andwer', tracks: [1,3]}
            //nested objects
            //1234: {id: 1234, name: andrew, tracks: [1,2,3,4]}
        },
        userList: [1234, 4567],
    }
  }

export default {
    TOTAL_RESET: state => Object.assign(state, getDefaultState()),

    //just copied over the code
    USER_ID_SET (state, {id, payload}) {
        state.users[id] = payload
    },
    USER_ID_FIELD_SET (state, {id, field, payload}) {
        state.users[id][field] = payload
    },
    USER_ADD_TRACK (state, {id, track}) {
        state.users[id].tracks.push(track)
    },
    USER_REMOVE_TRACK (state, {id, track}) {
        state.users[id].tracks.splice(state.users[id].tracks.indexOf(track))
    },
    USER_SET_LOGIN_ID (state, id) { 
        state.thisUser = id; 
    },
    USER_LOGOUT (state) {
        state.thisUser = null
    },
    USERSIDS_ADD (state,id) {
        state.userList.push(parseInt(id))
    },

}



    // USER_DATA_RESET (state) {
    //     console.log('user data reset, dont use this')
    //     delete state.users;
    //     state.usersIDs = [1234, 4567];
    //     state.thisUser = -1
    // },
    // USER_DATA_DELETE_ALL (state) {
    //     delete state.users;
    //     state.usersIDs = [];
    //     state.thisUser = 1234
    // },

    

    // USER_CREATE_NEW_ID (state, id) {//del
    //     state.users[id] = {}
    // },
    // USER_SET_ID_INFO (state, {id, info, payload}) {//del
    //     state.users[id][info] = payload
    // },
    // USER_INIT_TRACKS (state, id) {//del
    //     state.users[id].tracks = []
    // },