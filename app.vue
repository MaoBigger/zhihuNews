<template>
  <div class="big-container" ref="myList">
    <span>今日新闻</span>
    <div class="mainArticle" ref="myArticle">
      <Item v-for="item in data"
            :data="item"
            :key="item.id">
      </Item>
    </div>
    <input type="button" @click="getMore" value="getMore">
  </div>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  import Item from './components/item.vue'
  // import Article from './components/article.vue'
  import VueRouter from 'vue-router'
  import Util from './libs/util'

  Vue.use(VueRouter)
  var ajax = axios.create({
    baseURL: 'http://127.0.0.1:8010/'
  })
  export default {
    data: function () {
      return {
        msg: 'Hello myZhihu',
        data: [],
        dailyTime: Util.getTodayTime(),
        isLoading: false,
        touchFlag: false
      }
    },
    components: {
      Item
    },
    mounted() {
      var bodyHeight = document.documentElement.clientHeight
      ajax.get('news/latest')
        .then((res) => {
          this.data = res.data.stories
          this.$nextTick(() => {
            var container = document.querySelector('.container')
            console.log(container.clientHeight)
            console.log(document.body.clientHeight)
            if (container.clientHeight < bodyHeight) {
              this.touchFlag = true
              if (this.touchFlag) {
                this.slideGetMore()
              }
            }
          })
        })
      var $myList = this.$refs.myList
      var $myArticle = this.$refs.myArticle
      $myList.addEventListener('touchend', () => {
        if(this.isLoading) return
        console.log($myList.scrollTop)
        console.log(bodyHeight)
        if ($myList.scrollTop + bodyHeight >= $myArticle.offsetHeight) {
          this.getMore()
        }
      })

    },
    methods: {
      myJudge() {
        var container = document.querySelector('.container')
        console.log(container.clientHeight)
      },
      // 当数据较少的时候，向下滑动直接获得前一天的数据
      slideGetMore() {
        let isMove = false
        let distanceY = 0
        let startY = 0
        document.ontouchstart = function (e) {
          // var startX = e.touches[0].clientX
          startY = e.touches[0].clientY
        }
        document.ontouchmove = function (e) {
          isMove = true
          var endY = e.touches[0].clientY
          distanceY = endY - startY
        }
        document.ontouchend = e => {
          if (this.touchFlag && isMove && distanceY < -50) {
            console.log('向上滑了')
            this.getMore()
          }
          isMove = false
          distanceY = 0
          startY = 0
          this.touchFlag = false
        }
      },
      // 数据较多的时候，滑到底部获得前一天的数据

      getMore() {
        this.isLoading = true
        var currentDay = parseInt(this.dailyTime)
        currentDay = Util.format(currentDay)
        console.log(currentDay)
        ajax.get('news/before/' + currentDay)
          .then(res => {
            this.isLoading = false
            this.data = this.data.concat(res.data.stories)
          })
        this.dailyTime = this.dailyTime - 86400000
      },
      getMoreArticle() {
        this.isLoading = true
        const prevDay = Util.prevDay(this.dailyTime + 86400000)
        ajax.get('news/before/' + prevDay)
          .then(res => {
            this.data.push(res.data.stories)
            this.isLoading = false
          })
      }
    }
  }
</script>
<style scoped lang="less">
  body {
    height: 100%;
    overflow: hidden;
  }
  .big-container {
    height: 600px;
    overflow: auto;
  }
</style>