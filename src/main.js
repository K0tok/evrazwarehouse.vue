import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

//задаём базовый URL
axios.defaults.baseURL = 'http://localhost:3000'

//подключаем axios глобально
Vue.prototype.$axios = axios
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
