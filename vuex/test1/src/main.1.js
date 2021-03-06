// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from "vuex"
import App from './App'
import router from './router'
Vue.config.productionTip = false;

Vue.use(Vuex);
// 容器是唯一的
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state){
      state.count--;
    }
  }
})




// 计数器
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  computed: {
    count() {
      return store.state.count;
    }
  },
  template: `
    <div>
    <p>{{count}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
  `,
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    }
  }

  // ...App, //  等同于 这种template: '<App/>'
  // store, // store 被注册到了实例上，所有的组件都可以通过 这个属性  this.$store 拿到state
});
