import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import HelloWorld from '@/components/HelloWorld'
import App from '../App.vue'

Vue.use(Router)


export default new Router({
  routes : [
    {
      path : '/',
      name : 'main',
      components : main
    },
    {
      path : '/HelloWorld',
      components : HelloWorld
    }
  ]
})
