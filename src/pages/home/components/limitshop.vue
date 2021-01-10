<template>
  <ul class="list">
    <li>
      <div class="pic">
        <img :src="limit" alt />
      </div>
      <p>限时抢购</p>
    </li>
    <li>
      <div class="pic">
        <img :src="limit" alt />
      </div>
      <p>限时抢购</p>
    </li>
    <li>
      <div class="pic">
        <img :src="limit" alt />
      </div>
      <p>限时抢购</p>
    </li>
    <li>
      <div class="pic">
        <img :src="limit" alt />
      </div>
      <p>限时抢购</p>
    </li>
  </ul>
</template>

<script>
import limit from "../../../assets/img/img/home/1.jpg";
export default {
  data() {
    return {
      limit,
    };
  },
};
</script>

<style scoped lang="stylus">
@import '../../../stylus/index.styl';

.list {
  display: flex;
  text-align: center;
  justify-content: space-around;
}

.list .pic {
  width: 1.5rem;
  height: 1.5rem;
  background: $primary;
}

img {
  width: 100%;
}

.list p {
  font: $h2 / 0.5rem '微软雅黑';
  color: $fontColor2;
}
</style>