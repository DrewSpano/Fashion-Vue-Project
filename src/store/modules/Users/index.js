import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    thisUser: null,
    users: {
      0:{name: 'null', tracks: []},
      1234:{name: 'spandrew', tracks: [1,2,6,4,5]},
      4567:{name: 'Andwer', tracks: [1,3]},
      1122:{name: 'Iris', tracks:[4,6,7,14]}
      //nested objects
      //1234: {id: 1234, name: andrew, tracks: [1,2,3,4]}
    },
    userList: [0, 1234, 4567,1122],
  },
  
  mutations,
  actions,
  getters
}