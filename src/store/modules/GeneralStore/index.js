import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// const state = () => ({
//   username: "Andwer",
//   thisUser: 1234,           //ID for users prop
//   loginState: false,
//   totalTrackers: 0,
//   users:{
//       1234:{name: 'spandrew', tracks: [1,2]},
//       4567:{name: 'Andwer', tracks: [1,3]}
//   },
//   usersIDs: [1234, 4567],

//   tracklistData: {
//       //id: {... },
//       //1: {name: 'Palace',... },
//   },
//   //array of tracklistData IDs for easy sorting
//   tracklistIDs: [],    //[1,2,3,... ]
// })

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}