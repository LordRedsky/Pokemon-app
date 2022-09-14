import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)

library.add(fas)

app.component('fa', FontAwesomeIcon)
app.mount('#app')
