<template>
  <div class="home">
    <v-banner :banners="banners"></v-banner>
    <!-- 限时抢购 -->
    <v-limitshop></v-limitshop>
    <!-- 商品列表 -->
    <v-list :listGoods="listGoods"></v-list>
  </div>
</template>

<script>
import vBanner from "./components/banner";
import vList from "./components/list";
import vLimitshop from "./components/limitshop";
import { reqBanner, reqListGoods, reqSeckill } from "../../utils/http";
export default {
  components: {
    vBanner,
    vList,
    vLimitshop,
  },
  data() {
    return {
      banners: [],
      listGoods: [],
      seckill: [],
    };
  },
  mounted() {
    //一进来就发起请求
    reqBanner().then((res) => {
      this.banners = res.data.list;
    });
    reqListGoods().then((res) => {
      this.listGoods = res.data.list[0].content;
    });
    // reqSeckill().then((res) => {
    //   this.seckill = res.data.list;
    // });
  },
};
</script>

<style scoped lang="stylus">
@import '../../stylus/index.styl';

.home {
  padding-bottom: $footer;
}
</style>