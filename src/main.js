import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

import './commonCss/commonStyle.css'


import { Button, Input } from 'element-ui';
import Alert from './components/alert'
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component('alert', Alert);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

