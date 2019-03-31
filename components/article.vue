<template>
  <div class="myArticle">
    <div class="title">{{ data.title }}</div>
    <div class="my_content" v-html="data.body"></div>
    <div class="article-comments" v-show="comments.length">
      <span>评论({{ comments.length }})</span>
      <div v-for="item in comments" class="comment-container clearfix">
        <div class="the-avatar">
          <img :src="item.avatar" alt="">
        </div>
        <div class="the-right">
          <div class="the-author">{{ item.author }}</div>
          <div class="the-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  const imgPath = 'http://127.0.0.1:8011/img/'
  var ajax = axios.create({
    baseURL: 'http://127.0.0.1:8010/'
  })
  export default {
    data: function () {
      return {
        id: '',
        data: '',
        innerHtml: '',
        comments: []
      }
    },
    created() {
      this.id = this.$route.params.id
      var _this = this
      ajax.get('news/' + this.id)
        .then(function (res) {
          _this.data = res.data
          res.data.body = res.data.body.replace(/src="http/g, `src="${imgPath}http`)
          res.data.body = res.data.body.replace(/src="https/g, 'src="' + imgPath + 'https')
        })
      this.getComments()
    },
    methods: {
      getComments: function () {
        var _this = this
        ajax.get('story/' + this.id + '/short-comments').then(res => {
          // this.comments = res.comments.map(comment => {
          //   // 将头像的图片地址转为代理地址
          //   comment.avatar = $.imgPath + comment.avatar;
          //   return comment;
          // });
          _this.comments = res.data.comments.map((item) => {
            item.avatar = imgPath + item.avatar
            return item
          })
        })
      },
      getMore() {
        // ajax.get('')
      }
    }
  }
</script>
<style lang="less" scoped>
  .clearfix::after,
  .clearfix::before {
    content: '';
    display: table;
  }
  .clearfix::after {
    clear: both;
  }
  .clearfix {
    *zoom: 1;
  }
  .myArticle {
    .title {
      font-weight: 900;
      margin-top: 15px;
    }

    .comment-container {
      color: #666;
      width: 100%;
      margin: 10px;
      .the-avatar {
        float: left;
        /*display: inline-block;*/
        width: 48px;
        height: 48px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
          object-fit: contain;
        }
      }

      .the-right {
        margin-left: 56px;
      }
    }
  }
</style>