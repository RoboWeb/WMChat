//require('dotenv').config();

import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll/dist/vue-chat-scroll';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// Vue.use(uiv);
Vue.use(VueChatScroll);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
