import { createApp } from 'vue';
import App from '/@/App.vue';

const app = createApp(App);

import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

app.mount('#app');

