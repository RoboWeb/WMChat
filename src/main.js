//require('dotenv').config();

import Vue from 'vue';
import VueSanitize from 'vue-sanitize';
import VueChatScroll from 'vue-chat-scroll/dist/vue-chat-scroll';
import App from './App.vue';
import router from './router';

import {
  NAME,
  VERSION,
  ALLOWED_HTML_TAGS,
  ALLOWED_HTML_ATTRIBUTES
} from '@/app.conf';

/**
 * Sanitizing
 */
const opt = {
  allowedTags: ALLOWED_HTML_TAGS,
  allowedAttributes: ALLOWED_HTML_ATTRIBUTES
};
Vue.use(VueSanitize, opt);

Vue.config.productionTip = false;

Vue.use(VueChatScroll);

document.title = NAME + ' - ' + VERSION;

new Vue({
  router,
  render: h => h(App)
}).$mount('#wmchat');
