import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueProgressBar from "@aacassandra/vue3-progressbar"

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import './assets/main.css'
import './assets/sass/fonts.scss'

const app = createApp(App)

library.add(faSearch);


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



app.component("font-awesome-icon", FontAwesomeIcon).mount('#app')