import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Peer from "peerjs";
import Kakao from "./plugins/kakao";

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
