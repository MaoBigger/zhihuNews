import './style.css'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Index from './index.vue'
new Vue({
  el: '#app',
  render: h => {
    return h(Index)
  }
})