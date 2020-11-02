import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import store from "./store/store";
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter ({
  mode: 'history',
  routes
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
