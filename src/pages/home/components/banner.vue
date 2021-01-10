<template>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.id">
        <img :src="$pre+item.img" alt />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["banners"],
};
</script>

<style scoped lang="stylus">
@import '../../../stylus/index.styl';

.banner {
  margin-bottom: 0.2rem;
  height: 4rem;
}

.my-swipe img {
  display: block;
  width: 100vw;
  height: 4rem;
}
</style>