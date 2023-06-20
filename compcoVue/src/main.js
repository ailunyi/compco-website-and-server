import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueProgressBar from "@aacassandra/vue3-progressbar"

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import './assets/main.css'
import './assets/sass/fonts.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import {mdi} from "vuetify/lib/iconsets/mdi";



const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      sets: {
          mdi
      }
  },
  })
const app = createApp(App)

library.add(faSearch,faEye);


const options = {
    color: "#3E70F7",
    failedColor: "#874b4b",
    thickness: "3px",
    transition: {
      speed: "0.2s",
      opacity: "0.6s",
      termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
  };

app.use(VueProgressBar, options)
app.use(router)
app.use(vuetify)

app.component("font-awesome-icon", FontAwesomeIcon).mount('#app')