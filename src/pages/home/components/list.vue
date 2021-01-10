<template>
  <div class="list">
    <div class="listitem" v-for="item in listGoods" :key="item.id">
      <div class="pic">
        <img :src="$pre+item.img" alt />
      </div>
      <div class="info">
        <h3>{{item.goodsname}}</h3>
        <p>￥{{item.price|filterPrice}}</p>
        <button @click="runShop(item.id)" class="runBtn">立即抢购</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfo } from "../../../utils/http";
export default {
  props: ["listGoods"],
  methods: {
    runShop(id) {
      this.$router.push("/detail?id=" + id);
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../../stylus/index.styl';

.list {
  overflow: hidden;
}

.listitem {
  display: flex;
  padding: $padding20;
}

.listitem .pic {
  width: 2rem;
  height: 2rem;
  background: $primary;
  border-radius: 0.2rem;
  overflow: hidden;
}

.listitem .pic img {
  width: 100%;
}

.listitem .info {
  margin-left: $margin20;
}

.listitem .info h3 {
  font: $h1 / 0.6rem '微软雅黑';
  color: $fontColor1;
}

.listitem .info p {
  font: $h2 / 0.5rem '微软雅黑';
  color: $primary;
  margin-top: $margin10;
}

.runBtn {
  width: 2rem;
  height: $header;
  outline: none;
  border: none;
  font: $h2 / 0.3rem '微软雅黑';
  border-radius: 0.2rem;
}
</style>