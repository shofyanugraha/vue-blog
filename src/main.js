import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import NProgress from 'vue-nprogress'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.use(NProgress)

Vue.http.options.crossOrigin = true

const nprogress = new NProgress({ parent: '.nprogress-container' })

import Home from 'components/Home'
import Post from 'components/Post'

const Bar = { template: '<div>bar</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/post/:slug', name: 'showPost', component: Post },
    { path: '/home', component: Home },
    { path: '/bar', component: Bar },
    { path: '/category',
      component: Bar,
      children: [
        { path: '', component: Home },
        { path: ':catName', name: 'selCategory', component: Bar }
      ]
    },
    { path: '/author',
      component: Bar,
      children: [
        { path: ':slug', name: 'showAuthor', component: Bar }
      ]
    }
  ],
  linkActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  nprogress,
  template: '<App/>',
  components: { App }
}).$mount('#app')
