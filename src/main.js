// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import main from  './components/main'
import login from './components/login'
import searchQuestion from './components/searchQuestion'
import addQuestion from './components/addQuestion'
import searchAllQuestion from './components/searchAllQuestion'
import qusetionDbMain from './components/questionDbMain'
import questionQuestion from './components/questionMain'
import searchAllQuestionDb from './components/searchAllQuestionDb'

Vue.use(ElementUI);
Vue.use(VueRouter);

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Main = main;
const Login = login;
const SearchQuestion = searchQuestion;
const AddQuestion = addQuestion;
const SearchAllQuestion = searchAllQuestion;
const QuestionDbMain = qusetionDbMain;
const QuestionMain = questionQuestion;
const SearchAllQuestionDb = searchAllQuestionDb;

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', components : {
      default:  Main,
      a : Login ,
    }
    },
  { path: '/main', component: Main,
    children : [
      { path: '/questiondbmain', component : QuestionDbMain,
        children:[
          { path: '/searchAllQuestionDb', component : SearchAllQuestionDb },
          { path: '/searchAllQuestion/:id', component : SearchAllQuestion }
        ]
      },
      { path: '/questionmain', component : QuestionMain,
        children:[

          { path: '/addQuestion', component : AddQuestion },
          { path: '/searchQuestion', component : SearchQuestion },
        ]
      }
    ]},
  { path: '/login', component: Login }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
