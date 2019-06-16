import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "./styles/global-style.scss";

Vue.config.productionTip = false

Vue.filter("currency", function(value) {
  if (!value) return "";
  return value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP"
  });
});

new Vue({
  render: h => h(App),
}).$mount('#app')
