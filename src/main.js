//require('dotenv').config();

import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll/dist/vue-chat-scroll';
import App from './App.vue';
import router from './router';
import { NAME, VERSION } from '@/app.conf';

Vue.config.productionTip = false;

Vue.use(VueChatScroll);

document.title = NAME + ' - ' + VERSION;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
