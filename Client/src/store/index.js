import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { message } from './message.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    message
  }
});
