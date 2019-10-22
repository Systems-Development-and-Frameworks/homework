import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App)
}).$mount('#app');

// const todos = [
// 	{ id: '1', message: 'Foo', onEdit: false },
// 	{ id: '2', message: 'Bar', onEdit: false },
// 	{ id: '3', message: 'Baz', onEdit: false }
// ];
