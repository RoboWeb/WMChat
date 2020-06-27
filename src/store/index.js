import Vue from 'vue';
import Vuex from 'vuex';
import fb from '@/firebase/init';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    messages: [],
    user: {
      uid: 0,
      displayName: 'John Doe',
      email: 'john.doe@failmail.com',
      role: 'mod', // standard, mod, admin, writer, debutant, verifier, poefier
      token: '',
      color: '#F80000',
      avatarURL:
        'http://weryfikatorium.pl/forum/download/file.php?avatar=7460_1587067438.png'
    },
    newMessage: ''
  },
  getters: {},
  mutations: {},
  actions: {}
});

export default store;
