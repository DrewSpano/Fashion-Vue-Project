import axios from 'axios';
const url = "http://localhost:5000/api/tracks";
// const url2 = "https://localhost:5001/api/Malltime/";

export default{
    RESET_DATA(context) {
        // //for a button on the profile page, just in case
        // console.log('RESETTING NUMBER...')
        // context.commit('TOTALTRACKERS_RESET')
        // console.log('RESETTING DATA...')
        // context.commit('DATA_RESET')
        console.log('resetting state')
        context.commit('TOTAL_RESET')
    },
    addTrack(context) {
        console.log('adding track...', context.state.totalTrackers)
        context.commit('addTrack')
        console.log('added track',context.state.totalTrackers)
    },
    delTrack(context) {
        if (context.state.totalTrackers > 0) {
            context.commit('TrackDelete',context.state.totalTrackers)
            context.commit('delTrack')
        }
    },
    setTrack(context, newTrackNum) {
        console.log('action setTrack called')
        // context;
        // newTrackNum;
        if (newTrackNum >= 0) {
            //if we want to decrease the amount of tracks
            if (newTrackNum < context.state.totalTrackers) {
                while (newTrackNum < context.state.totalTrackers) {
                    console.log('delTrack')
                    context.dispatch('delTrack')
                }
            }
            //if we want to increase the amount of tracks
            else if (newTrackNum > context.state.totalTrackers) {
                while (newTrackNum > context.state.totalTrackers) {
                    console.log('addTrack in while loop...', newTrackNum,'>',context.state.totalTrackers)
                    context.dispatch('addTrack')
                }
            }
            // context.commit('setTrack')
        }
        console.log(context.state.totalTrackers)
    },

    TrackCreate(context, targetTrack) {
        if (context.state.tracklistData[targetTrack] === undefined) {
            context.commit('TrackCreate', targetTrack)
            context.commit('TRACKID_ADD', targetTrack)

            //active state is used for trails
            context.commit('TRACK_SET_INACTIVE',targetTrack)
        }
    },

    TrackClear(context, targetTrack) {
        context.commit('TrackCreate', targetTrack)
    },

    TrackDelete(context, targetTrack) {
    try {
        console.log('ERASING TRACK',targetTrack)
        context.commit('TrackDelete',targetTrack)
        context.commit('TRACKID_DEL',targetTrack)
    }
    catch(err) { console.log(err) }
    },

    TrackClone(context, targetTrack) {      //DONT NEED
        if (context.getters.trackAllBlanks(targetTrack) !== true) {
            context.commit('addTrack');
            context.commit('TrackCloneIntoLast', targetTrack)
        }
    },

    TrackOverwrite(context, {trackToClone, trackToKill}) {
        context.commit("TrackOverwrite",{trackToClone, trackToKill})
    },
    //payload consists of two integers to swap
    TrackReorder(context, payload) {
        const {item1, item2} = payload;
        const tempObj1 = context.state.tracklistData[item1];
        const tempObj2 = context.state.tracklistData[item2];
        context.commit('TrackEqualToObject',{target: item1, trackObject:tempObj2})
        context.commit('TrackEqualToObject',{target: item2, trackObject:tempObj1})
    },

    CreateInfo(context, payload) {
        context.commit('CreateInfo',payload)
    },

    UpdateInfo(context, payload) {
        context.commit('UpdateInfo', payload)
    },

    TrackSetInactive(context, targetTrack) {
        context.commit('TRACK_SET_INACTIVE', targetTrack)
    },
    TrackSetActive(context, targetTrack) {
        context.commit('TRACK_SET_ACTIVE', targetTrack)
    },
    //toggles active/inactive and takes some edge cases into account
    TrackToggleActive(context, targetTrack) {
        if (context.getters.trackExists(targetTrack) && 
        context.state.tracklistData[targetTrack].active !== undefined) {
            if (context.getters.trackIsActive(targetTrack)) {
                //track is active, set to inactive
                context.dispatch('TrackSetInactive', targetTrack)
            } else {
                //track is inactive, set to active
                context.dispatch('TrackSetActive', targetTrack)
            }
        } else if (context.getters.trackExists(targetTrack)) {
            //track exists, activity is undefined, set activity as inactive
            context.dispatch('TrackSetInactive', targetTrack)
        } else {
            //track doesn't exist, log an error
            console.log('ERROR: TrackToggleActivate on a track that does not exist')
        }
    },

    TrackAllToActive(context) {
        const allInactives = context.getters.trackAllInactives;
        for (var track in allInactives) {
            context.dispatch('TrackSetActive', allInactives[track])
        }
    },

    UserLoginUpdate(context, userID) {
        if (context.state.users !== undefined) {
            context.commit('USER_SET_LOGIN_ID', userID)
        }
    },
    UserCreate(context, {email, username}) {
        //get a random number (usually 4 digits), make sure that it's not already used
        let newID;
        do {newID = Math.floor(Math.random() * 10000)}
        while (context.state.users[newID] !== undefined)

        console.log(`Creating new User with ID ${newID}`);
        context.commit('USER_CREATE_NEW_ID', newID);


        console.log(`Setting ${newID}'s email to ${email}`)
        context.commit('USER_SET_ID_INFO',{id: newID, info:'email', payload: email});

        console.log(`Setting ${newID}'s name to ${username}`)
        context.commit('USER_SET_ID_INFO',{id: newID, info:'name', payload: username});
        context.commit('USER_INIT_TRACKS', newID)
        context.commit('USERSIDS_ADD', newID);
    },
    UserIDsSync(context) {
        for (let user in context.state.users) {
            if (context.state.usersIDs.indexOf(parseInt(user)) === -1){
                // context.state.usersIDs.push(parseInt(user))
                context.commit('USERSIDS_ADD', user)
            }
        }
    },

    UserAddTracks(context, {id, tracks}) {
        for (let track of tracks) {
            context.commit('USER_ADD_TRACK',{id:id, track:track})
        }
    },

    // TESTACTION_dbpush(context) {
    //     axios.post('https://tracking-seams-default-rtdb.firebaseio.com/users.json',{ 
    //         users: context.state.usersIDs,
    //     })
    // },
    

    //used for tracks, may delete
    // trackFieldInfo(context, {trackNumber, field}) {
    //     var fullTrackPath = context.state.tracklistData[trackNumber][field]
    //     if (fullTrackPath !== undefined) {
    //         //return info
    //         return fullTrackPath
    //     } else {
    //         //create info, then return
    //         this.CreateInfo({field, number:trackNumber})
    //         return fullTrackPath
    //     }
    // },

    //used for tracks
    //this initializes the field
    initFieldInfo(context, {trackNumber, field}) {
        if (context.state.tracklistData[trackNumber][field] === undefined) {
            // this.CreateInfo({field, number:trackNumber})
            context.commit('CreateInfo',{field, number: trackNumber})
        }
    },
    
    updateTrack(context, {newTrackID, newTrack}) {
        // context.state.tracklistData[newTrackID] = newTrack
        context.commit('testUpdateTrack',{newTrackID, newTrack})
    },

    postTrack (context, trackID) {
        const track = context.state.tracklistData[trackID]
        axios.post(url, 
            {
                "id": track.id,
                "trackName": track.trackName,
                "trackLink": track.trackLink,
                "trackDescription": track.trackDescription,
                "trackDay": track.trackDay,
                "trackTime": track.trackTime,
                "trackAMPM": track.trackAMPM,
                "trackTags": track.trackTags
            }
        )
      },

    putTrack (context, trackID) {
        const track = context.state.tracklistData[trackID];
        axios.put(url+trackID,
            {
                "id": track.id,
                "trackName": track.trackName,
                "trackLink": track.trackLink,
                "trackDescription": track.trackDescription,
                "trackDay": track.trackDay,
                "trackTime": track.trackTime,
                "trackAMPM": track.trackAMPM,
                "trackTags": track.trackTags
            }
        )
        
    },
    
    // updateTrackFromGet (context, {trackID, newTrack}) {
    //     context.commit('testUpdateTrack', {newTrackID: trackID, newTrack})
    // },

// END OF ACTIONS //
}