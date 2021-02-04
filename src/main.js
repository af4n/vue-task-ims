import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import VueTelInput from 'vue-tel-input'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueTelInput, {
  defaultCountry: 'ru',
  inputOptions: {
    placeholder: 'Телефон'
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
