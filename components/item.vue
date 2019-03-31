<template>
  <div class="container" @click="jump(data.id)">
    <span>{{ data.title }}</span>
    <div class="imgContainer">
      <img :src="imgPath + data.images[0]" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        imgPath: 'http://127.0.0.1:8011/img/'
      }
    },
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      jump: function (id) {
        this.$router.push(`/article/${id}`)
        // console.log(this.data.id)
      }
    }
  }
</script>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
@mainColoe: #f80;
.container{
  height: 100px;
  border: 1px solid #ccc;
  box-shadow: 1.5px 1.5px 1px #ccc;
  border-radius: 3px;
  position: relative;
  box-sizing: border-box;
  margin: 5px 0px;
  span {
    position: absolute;
    top: 8px;
    left: 8px;
    margin-right: 120px;
  }
  .imgContainer {
    position: relative;
    float: right;
    height: 100%;
    width: 100px;
  }
  img {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    width: 80px;
    margin: auto;
  }
}
</style>