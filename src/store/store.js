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

        tracklistData: { 
            //FIND DEFAULTS FOR TRACK IN: TrackClear mutation
            1:{},
            
            //returns true if all fields are filled, otherwise, return the first offending field
            allFilled: function(target) {
                for (const field in this[target]) {
                    if (this[target][field] === undefined || this[target][field] === "") {
                        //at least one field is blank
                        return field;
                    }
                }
                return true;
            },

            //returns true if all fields are blank, otherwise, return the first offending field
            allBlanks: function(target) {
                for (const field in this[target]) {
                    if (this[target] === {} || this[target][field] === undefined || this[target][field] === "") { continue } 
                    //as soon as we detect one non-blank, break and return the field
                    else {return field}
                }
                return true;
            },
        },

        totalTrackers: 0,
      },

    mutations: {
        logTrue: state => state.loginState = true,
        logFalse: state => state.loginState = false,
        addTrack: state => state.totalTrackers++,
        delTrack(state) {
            if (state.totalTrackers > 0) {
                state.totalTrackers--;
            }
        },
        setTrack(state, payload) {
            console.log('setTrack called. Setting total tracks to',payload)
            if (payload >= 0) {
                state.totalTrackers = payload
            }
        },

        //TrackCreate is called on TrackListPage when a new track is added. 
        //It is called along with addTrack
        //Use it to create a new track object to place info in
        //Payload should be a positive integer
        TrackCreate(state, payload) {
            state.tracklistData[payload] = {}
        },
        //Clears all the info in the track by using track 0 as default
        TrackClear(state, number) {
            console.log('store commit TrackClear called on Track',number)
            state.tracklistData[number] = { 
            "name": "",
            "link": "",
            "day": "",
            "time": "",
            "ampm": "" ,
            "description": "",
            };
        },

        //Creates a new space for information to be saved. Useful when there is a newly created track or recently cleared one.
        //needs number and name to create the info. 
        CreateInfo(state, payload) {
            state.tracklistData[payload.number][payload.name] = ""
        },

        //UpdateInfo updates a track field. Called from computed set. Needs number, name, and value. 
        UpdateInfo(state, payload) {
            state.tracklistData[payload.number][payload.name] = payload.value
        },

        //TrackReorder swaps two tracks. Payload should be an object with two numbers, corresponding to the numbers you want to swap
        TrackReorder(state, payload) {
            console.log('TrackReorder called')
            const {item1, item2} = payload;
            const data = state.tracklistData;
            var tempData;

            tempData = data[item2]
            //console.log('logging tempData...',tempData)
            data[item2] = data[item1]
            data[item1] = tempData
        },

        //TrackClone adds to totaltracks and places a designated track in its place. Payload should be a single integer
        //for the designated information
        TrackClone(state, payload) {
            console.log('TrackClone called')
            //if the payload isn't blank
            if ( state.tracklistData.allBlanks(payload) !== true ) {
                state.totalTrackers++;
                state.tracklistData[state.totalTrackers] = state.tracklistData[payload];
            }
        },
    // END OF MUTATIONS //
    },

    plugins: [vuexLocalStorage.plugin]
});

export default store