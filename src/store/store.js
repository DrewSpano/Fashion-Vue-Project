import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';
import GeneralStore from './modules/GeneralStore/index';
import Tracks from './modules/Tracks/index';
import Users from './modules/Users/index';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    reducer: (state) => ({ Users: state.Users }),
    storage: window.localStorage
})

export default new Vuex.Store({
    modules: {
      GeneralStore,
      Tracks,
      Users,
    },

    plugins: [vuexLocalStorage.plugin]
})