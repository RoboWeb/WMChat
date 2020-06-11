import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Chat from '@/views/Chat.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'loginForm',
    component: Login
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        console.log(`A to Ty [${to.params.name}] stary? Wejdź.`);
        next();
      } else {
        console.log('Nie znam Cię ' + to.params.name);
        next({ name: 'loginForm' });
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router;
