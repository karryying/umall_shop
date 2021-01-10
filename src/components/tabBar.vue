<template>
  <div class="footer">
    <router-link v-for="(item) in list" :key="item.text" :to="item.path" active-class="select">
      <img :src="$route.path===item.path?item.select_img:item.no_select" alt />
      <div>{{item.text}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      n: 0,
    };
  },
};
</script>

<style scoped lang="stylus">
@import '../stylus/index.styl';

.footer {
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: $footer;
  background: $selectColor;
  border-top: 1px solid $borderColor;
}

.footer a {
  flex: 1;
  float: left;
  text-align: center;
  color: $fontColor1;
}

img {
  width: 0.3rem;
  height: 0.3rem;
}

a div {
  font: $h3 / 0.4rem '微软雅黑';
}

.footer .select {
  color: $primary;
}
</style>