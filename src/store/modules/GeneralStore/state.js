const getDefaultState = () => {
  return {
    // username: "Andwer",
    thisUser: 1234,           //ID for users prop
    loginState: false,
    totalTrackers: 0,
    users:{
      1234:{name: 'spandrew', tracks: [1,2,3,4,5]},
      4567:{name: 'Andwer', tracks: [1,3]}
    },
    usersIDs: [1234, 4567],

    tracklistData: {
      //id: {... },
      //1: {name: 'Palace',... },
    },
    //array of tracklistData IDs for easy sorting
    tracklistIDs: [],    //[1,2,3,... ]
  }
}

const state = getDefaultState()

export default state