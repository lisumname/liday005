import Vue from 'vue';

import App from './componments/app'

const app = new Vue({
    el: '#app',
    template:`<App/>`,
    components:{
        App:App
    }
});