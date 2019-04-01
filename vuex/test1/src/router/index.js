import Vue from 'vue'
import Router from 'vue-router'
import chapter1 from "@/components/chapter1";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "chapter1",
      component: chapter1
    }
  ]
});
