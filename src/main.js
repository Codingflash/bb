import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import 'reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import Router from 'vue-router'
import filter from "./filter";


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$http = axios;


Object.keys(filter).forEach(ele=>{
  Vue.filter(ele,filter[ele]);
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
