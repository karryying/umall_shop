<template>
  <div class="mine">
    <div class="top"></div>
    <div class="userinfo">
      <div class="inner">
        <div class="pic">
          <img :src="touxiang" alt />
        </div>
        <p class="nickname">{{user.nickname}}</p>
      </div>
    </div>
    <div class="mylike">
      <img src alt />
      我的收藏(5)
    </div>
    <hr class="hr2" />
    <div class="order">
      <p>我的订单</p>
      <a href="#">查看订单</a>
    </div>
    <div>
      <van-tabbar class="mineTab" v-model="icon.active">
        <van-tabbar-item v-for="i in 5" :key="i" badge="3">
          <template>
            <img :src="icon.active" />
          </template>
          <span>待发货</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <hr class="hr2" />
    <div class="receive">
      <p>收货地址管理</p>
    </div>
  </div>
</template>

<script>
import daifukuan from "../../assets/img/img/me/daifukuan.png";
import touxiang from "../../assets/img/1.jpg";
export default {
  data() {
    return {
      user: {},
      touxiang,
      daifukuan,
      icon: {
        active: daifukuan,
      },
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>
<style scoped lang="stylus">
@import '../../stylus/index.styl';

.mine {
  height: 100vh;
  background: rgb(227, 233, 238);
}

.top {
  height: 3rem;
  background: $primary;
}

.userinfo {
  position: relative;
  width: 100%;
  height: 1.7rem;
  background: $selectColor;
}

.userinfo .inner {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -40%);
}

.pic {
  width: 1.8rem;
  height: 1.8rem;
  border: 0.15rem solid $selectColor;
  border-radius: 100%;
  overflow: hidden;
}

.pic img {
  width: 100%;
}

.userinfo p {
  font: $h2 / 0.5rem '微软雅黑';
  text-align: center;
}

.mylike {
  width: 100%;
  height: 1rem;
  font: $h2 / 1rem '微软雅黑';
  background: $primary;
  color: $fontColor1;
  background: $selectColor;
}

.order {
  display: flex;
  height: 1rem;
  justify-content: space-between;
  border-bottom: 1px solid;
  font: $h2 / 1rem '微软雅黑';
  background: $selectColor;
}

.order p {
  padding-left: $padding20;
}

.order a {
  color: $fontColor3;
  padding-right: $padding20;
}

ul {
  background: $selectColor;
}

.mineTab {
  position: static;
  height 1.2rem
}

.mineTab img {
  width: 0.4rem;
  display: block;
  margin: 0 auto;
}
.mineTab span {
  font $h3/.4rem "微软雅黑"
}  
.van-tabbar-item__icon .van_info {
  right: -10px;
}

.receive {
  width: 100%;
  height: 1rem;
  background: $selectColor;
  font: $h2 / 1rem '微软雅黑';
}

.receive p {
  padding-left: $padding20;
}
</style>