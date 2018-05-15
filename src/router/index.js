import Vue from 'vue'
import VueRouter from 'vue-router'

import PostList from '@/components/PostList'

import PostDetail from '@/components/PostDetail'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/posts',
    name: 'Post List',
    component: PostList
  }, {
    path: '/post/:slug',
    name: 'Post Detail',
    props: true,
    component: PostDetail
  }, {
    path: '/',
    redirect: '/posts'
  }]
})
