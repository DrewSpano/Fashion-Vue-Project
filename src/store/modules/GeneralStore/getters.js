
export default {
    testGetter: () => 'gotted',
    testdata: (state) => state.tracklistData[1].name,
    trackData: (state) => state.tracklistData,
    trackTotal: (state) => state.totalTrackers,
    // trackTotal: (state) => state.username,

    //returns true if all fields are filled, otherwise, return the first offending field
    trackAllFilled: (state) => (target) => {
        const data = state.tracklistData;
        for (const field in data[target]) {
            if (data[target][field] === undefined || data[target][field] === "" && data[target][field] !== data[target].active) {
                //at least one field is blank
                return field;
            }
        }
        return true;
    },

    //reutrns true if all fields are blank, otherwise, return the first offending field
    trackAllBlanks: (state) => (target) => {
        const data = state.tracklistData;
        for (const field in data[target]) {
            if (data[target] === {} || data[target][field] === undefined || data[target][field] === "" || data[target][field] === data[target].active ) {
                continue
            }
            //as soon as we detect one non-blank, break and return the field
            else {return field}
        }
        return true
    },

    trackExists: (state) => (target) => {
        const data = state.tracklistData;
        if (data[target] !== undefined) {
            return true
        } else {return false}
    },

    trackIsActive: (state) => (trackNumber) => {
        return state.tracklistData[trackNumber].active
    },
    trackAllInactives: (state) => {
        var inactivesArray = [];
        for (var track in state.tracklistData) {
            if (state.tracklistData[track].active === false) {
                //push all inactive tracks into activesArray
                inactivesArray.push(track)
            }
        }
        //returns an array with the ids of all inactive tracks
        return inactivesArray;
    },

    //used by tracks to retrieve the info for a text field
    trackFieldInfo: (state) => ({trackNumber, field}) => {
        return state.tracklistData[trackNumber][field]


        //commented out for getFieldInfo() in track.vue
        // if (fullTrackPath !== undefined) {
        //     return fullTrackPath 
        // } else {
        //     state.dispatch('GeneralStore/CreateInfo', {field: field, number: trackNumber})
        //     return fullTrackPath
        // }
    },

    trailFieldInfo: (state) => ({trailNumber, field}) => {
        var fullTrailPath = state.tracklistData[trailNumber][field]
        //if the field contains real information
        if (fullTrailPath !== undefined && fullTrailPath !== '') {
            return fullTrailPath
        } 
        //if the field is an empty string
        else if (fullTrailPath == '') {
            return `empty: ${field}`
        }
        //if the field is undefined
        else if (fullTrailPath == undefined) {
            return `UNDEF: ${field}`
        }
        //if something else, somehow
        else {
            console.log('trail number',trailNumber,'failing')
            return `N/A: ${field}`
        }
    },

    userName: (state) => state.users[state.thisUser].name,
    userTracks: (state) => state.users[state.thisUser].tracks,
    userInfo: (state) => state.users[state.thisUser],

    userTracksIfExists: (state) => {
        if (state.users[state.thisUser].tracks !== undefined) {
            return state.users[state.thisUser].tracks
        } else{
        return "doesn't exist"}
    }
}