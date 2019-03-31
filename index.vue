<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import Vuex from 'vuex'
  import App from './app.vue'
  import Article from './components/article.vue'
  Vue.use(VueRouter)
  Vue.use(Vuex)
  const store = new Vuex.Store({
    state: {
      id: 0
    }
  })
  var routerObj = new VueRouter({
    routes:[
      {path: '/', redirect: '/app'},
      {path: '/app', component: App},
      {path: '/article/:id', component: Article}
    ],
    mode: 'history'
  })
  export default {
    data: function () {
      return {

      }
    },
    router: routerObj
  }
</script>
<style lang="less" scoped>

</style>