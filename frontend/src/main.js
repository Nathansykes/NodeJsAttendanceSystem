import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router';
import './assets/all.css';

if(process.env.MODE === 'pipelines') {
    setTimeout(() => {
        process.exit(0);
    }, 20000);
}

createApp(App).use(router).mount('#app');