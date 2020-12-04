import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex',
    storage: window.localStorage
})

const store = new Vuex.Store({
    state: {
        username: "Andwer",
        loginState: false,
        totalTrackers: 0,
        tracklistData: {
            1:{}
        },
      },

    mutations: {
        DATA_RESET: state => state.tracklistData = {1:{}},
        TOTALTRACKERS_RESET: state => state.totalTrackers = 0,
        logTrue: state => state.loginState = true,
        logFalse: state => state.loginState = false,
        addTrack: state => state.totalTrackers++,
        delTrack: state => state.totalTrackers--,
        //Not currently used 11/13/2020
        setTrack(state, newTrackNum) {
            state.totalTrackers = newTrackNum
        },

        TrackCreate(state, targetTrack) {
            state.tracklistData[targetTrack] = {}
        },

        TrackDelete(state, targetTrack) {
            delete state.tracklistData[targetTrack];
        },

        TrackCloneIntoLast(state, targetTrack) {
            state.tracklistData[state.totalTrackers] = state.tracklistData[targetTrack];
        },

        TrackCloneIntoTarget(state, payload) {
            console.log('ERROR: TrackCloneIntoTarget called in vuex mutations. use TrackOverwrite instead.')
            const {item1, item2} = payload;
            state.tracklistData[item1] = state.tracklistData[item2];
        },
        
        TrackOverwrite(state, payload) {
            const {trackToClone, trackToKill} = payload;
            state.tracklistData[trackToKill] = state.tracklistData[trackToClone];
        },

        TrackEqualToObject(state, payload) {
            const {target, trackObject} = payload;
            state.tracklistData[target] = trackObject;
        },

        //Sets active state to inactive. Also used to create the active state info
        //active state is used for trail rendering
        TRACK_SET_INACTIVE(state, targetTrack) {
            state.tracklistData[targetTrack].active = false;
        },
        TRACK_SET_ACTIVE(state, targetTrack) {
            state.tracklistData[targetTrack].active = true;
        },

        //Creates a new space for information to be saved. needs number and field to create the info. 
        CreateInfo(state, payload) {
            state.tracklistData[payload.number][payload.field] = ""
        },

        //UpdateInfo updates a track field. Called from computed set. Needs number, name, and value. 
        UpdateInfo(state, payload) {
            state.tracklistData[payload.number][payload.name] = payload.value;
        },
        
    // END OF MUTATIONS //
    },

    actions: {
        RESET_DATA(context) {
            //for a button on the profile page, just in case
            console.log('RESETTING NUMBER...')
            context.commit('TOTALTRACKERS_RESET')
            console.log('RESETTING DATA...')
            context.commit('DATA_RESET')
        },
        addTrack(context) {
            context.commit('addTrack')
            console.log('added track',this.state.totalTrackers)
        },
        delTrack(context) {
            if (this.state.totalTrackers > 0) {
                context.commit('TrackDelete',this.state.totalTrackers)
                context.commit('delTrack')
            }
        },
        setTrack(context, newTrackNum) {
            if (newTrackNum >= 0) {
                //If we want to decrease the amount of tracks
                if (newTrackNum < this.state.totalTrackers) {
                    while (newTrackNum < this.state.totalTrackers) {
                        context.dispatch('delTrack')
                    }
                }
                //if we want to increase the amount of tracks
                else if (newTrackNum > this.state.totalTrackers) {
                    while (newTrackNum > this.state.totalTrackers) {
                        context.dispatch('addTrack')
                    }
                }
                //context.commit('setTrack')
            }
        },

        TrackCreate(context, targetTrack) {
            if (this.state.tracklistData[targetTrack] === undefined) {
                context.commit('TrackCreate', targetTrack)
                //active state is used for trails
                context.commit('TRACK_SET_INACTIVE',targetTrack)
            }
        },

        TrackClear(context, targetTrack) {
            context.commit('TrackCreate', targetTrack)
        },

        TrackDelete(context, targetTrack) {
            console.log('ERASING TRACK',targetTrack)
            context.commit('TrackDelete',targetTrack)
        },

        TrackClone(context, targetTrack) {
            if (store.getters.trackAllBlanks(targetTrack) !== true) {
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
            const tempObj1 = this.state.tracklistData[item1];
            const tempObj2 = this.state.tracklistData[item2];
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

        // END OF ACTIONS //
    },

    getters: {
        //returns true if all fields are filled, otherwise, return the first offending field
        trackAllFilled: (state) => (target) => {
            const data = state.tracklistData;
            for (const field in data[target]) {
                if (data[target][field] === undefined || data[target][field] === "") {
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
                if (data[target] === {} || data[target][field] === undefined || data[target][field] === "") {
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

        //used by tracks to retrieve the info for a text field
        trackFieldInfo: (state) => (trackNumber, field) => {
            var fullTrackPath = state.tracklistData[trackNumber][field]
            if (fullTrackPath !== undefined) {
                return fullTrackPath 
            } else {
                store.dispatch('CreateInfo', {field: field, number: trackNumber})
                return fullTrackPath
            }

        },

        trailFieldInfo: (state) => (trailNumber, field) => {
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
                return `undefined: ${field}`
            }
            //if something else, somehow
            else {
                console.log('trail number',trailNumber,'failing')
                return `N/A: ${field}`
            }
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

        trackData: (state) => state.tracklistData,
        trackTotal: (state) => state.totalTrackers,
    },


    plugins: [vuexLocalStorage.plugin]
});

export default store