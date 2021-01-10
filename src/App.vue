<template>
  <div class="page">
    <header v-if="judgeHeader($route.path)" class="header header1">
      <div class="left">
        <go-back v-if="judgeBack($route.path)" class="goback"></go-back>
        <p v-if="$route.path === '/index/mine'">设置</p>
      </div>
      <h3 class="center">{{$route.name}}</h3>
      <div class="right">
        <!-- 仅有登录页面才有注册 -->
        <router-link v-if="$route.path==='/login'" class="a" to="/register">注册</router-link>
        <p v-if="$route.path === '/index/mine'">消息</p>
      </div>
    </header>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    judgeBack(path) {
      //判断当前访问的是否是登录页，或者当前的路径是否包含index  如果都正确则隐藏返回按钮
      let name = this.$route.name;
      if (name === "登录" || path.includes("index") || path === "/") {
        return false;
      } else {
        return true;
      }
    },
    judgeHeader(path) {
      if (path === "/index/home" || path === "/search") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped lang="stylus">
@import './stylus/index.styl';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header;
  display: flex;
}

.header h3 {
  flex: 1;
}

.header1 {
  z-index: 100;
  justify-content: space-between;
  background: $primary;
  text-align: center;
  font: 0.35rem / $header '微软雅黑';
  color: $selectColor;
}

.header1 .left {
  width: 2rem;
  text-align: left;
}

.header1 .right {
  width: 2rem;
  text-align: right;
}

.header1 .right .a {
  padding-right: $margin20;
  font: 0.35rem / $header '微软雅黑';
  color: $selectColor;
}

.header1 .left p {
  padding-left: $padding20;
}

.header1 .right p {
  padding-right: $padding20;
}
</style>