import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    thisUser: 1234,   //
    users: {
      1234:{name: 'spandrew', tracks: [1,2,6,4,5]},
      4567:{name: 'Andwer', tracks: [1,3]}
      //nested objects
      //1234: {id: 1234, name: andrew, tracks: [1,2,3,4]}
    },
    userList: [1234, 4567],
  },
  
  mutations,
  actions,
  getters
}