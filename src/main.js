// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './index';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import IndexPage from './pages/goods.vue';
import RatingsPage from './pages/ratings.vue';
import SellerPage from './pages/seller.vue';
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
let router = new VueRouter({
        linkActiveClass: 'active',
        mode: 'history',
        redirect: '/goods',
        routes: [
            {
                path: '/',
                component: IndexPage
            },
            {
                path: '/ratings',
                component: RatingsPage
            },
            {
                path: '/seller',
                component: SellerPage
            }
        ]
    });
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
