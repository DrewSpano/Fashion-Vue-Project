//this module will be used for track related things. Adding, deleting, changing, whatever. 
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    url: "http://localhost:5000/api/",    
    //saves me some typing, pretty sure there's a better way to do this
    tracks: {
      //1: {... },    //ids as keys
    }, 
    trackList: [
      //1,
      //2,  array of ids for easy sorting
    ]
  }, 

  mutations,
  
  actions,
  getters,
}