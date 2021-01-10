<template>
  <div class="detail">
    <div class="goodsInfo">
      <div class="pic">
        <img :src="$pre+goodsInfo.img" alt />
      </div>
      <div class="detailIntro">
        <div class="introTop">
          <h3>{{goodsInfo.goodsname}}</h3>
          <div class="like">收藏</div>
        </div>
        <p>
          <i v-if="goodsInfo.price">￥{{goodsInfo.price|filterPrice}}</i>
          <span v-if="goodsInfo.ishot == 1">热卖</span>
          <span v-if="goodsInfo.isnew == 1">新品</span>
        </p>
        <del v-if="goodsInfo.market_price">￥{{goodsInfo.market_price|filterPrice}}</del>
      </div>
    </div>
    <hr />
    <div class="goodsdesc" v-html="goodsInfo.description"></div>
    <div class="bottom">
      <van-button @click="show = true" type="primary">加入购物车</van-button>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '45%' }">
      <div class="poptop">
        <div class="pic">
          <img :src="$pre+goodsInfo.img" alt />
        </div>
        <h3>{{goodsInfo.goodsname}}</h3>
      </div>
      <h4 class="specsname">{{goodsInfo.specsname}}</h4>
      <div class="specs">
        <span
          @click="n = index"
          :class="index===n?'select':''"
          v-for="(item,index) in goodsInfo.specsattr"
          :key="item"
        >{{item}}</span>
      </div>
      <van-button class="btn" @click="add" type="primary">加入购物车</van-button>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import { getGoodsInfo, addCart } from "../../utils/http";
export default {
  beforeRouteEnter(to, from, next) {
    if (
      from.path === "/index/home" ||
      from.path === "/catelist" ||
      from.path === "/index/shop"
    ) {
      next();
    } else {
      next("/index/home");
      return;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query.id);
    next();
  },
  data() {
    return {
      n: 0,
      show: false,
      goodsInfo: {},
      data: {
        uid: "",
        goodsid: "",
        num: 1,
      },
    };
  },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let id = this.$route.query.id;
    this.init(id);
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    add() {
      let uid = JSON.parse(localStorage.getItem("user")).uid;
      let goodsid = this.$route.query.id;
      this.data = { uid, goodsid, num: 1 };
      addCart(this.data).then((res) => {
        if (res.data.code === 200) {
          Toast("添加成功");
        }
        //弹框消失
        this.show = false;
      });
    },
    init(id) {
      getGoodsInfo(id).then((res) => {
        if (res.data.list === null) {
          Toast("暂无数据");
          return;
        }
        this.goodsInfo = res.data.list[0];
        this.goodsInfo.specsattr = JSON.parse(this.goodsInfo.specsattr);
      });
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../stylus/index.styl';

.detail {
  width: 100vw;
  height: 100vh;
  padding-top: $header;
}

.goodsInfo .pic {
  width: 100vw;
  height: 7rem;
}

.goodsInfo .pic img {
  width: 100%;
  height: 7rem;
}

.goodsInfo .introTop {
  display: flex;
}

.goodsInfo .introTop h3 {
  flex: 1;
  font: $h1 / $header '微软雅黑';
  color: $fontColor1;
  border-right: 1px solid;
  padding-left: 0.3rem;
}

.goodsInfo .introTop div {
  width: 1rem;
  font: $h3 / 0.8rem '微软雅黑';
  color: $primary;
  text-align: center;
}

.goodsInfo p {
  padding: 0 $padding20;
}

.goodsInfo p i {
  font: $h2 / 0.4rem '微软雅黑';
  vertical-align: middle;
  margin-right: $margin20;
}

.goodsInfo p span {
  display: inline-block;
  height: 0.4rem;
  padding: $padding10;
  margin-left: $margin10;
  border: 1px solid $primary;
  font: $h2 / 0.4rem '微软雅黑';
  color: $primary;
}

.goodsInfo del {
  font: $h3 / 0.6rem '微软雅黑';
  color: $fontColor3;
  margin-left: 10px;
}

.goodsdesc {
  padding-bottom: 1.5rem;
}

.goodsdesc img {
  width: 100%;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: #fff;
}

.van-button--primary {
  float: right;
  width: 3rem;
  height: 100%;
  font: $h2 / 1rem '微软雅黑';
  background: $primary;
  margin: 0;
}

.poptop {
  display: flex;
  padding: $padding20;
}

.poptop .pic {
  width: $imgWH;
  height: $imgWH;
  background: pink;
  border-radius: 0.2rem;
  overflow: hidden;
}

.poptop .pic img {
  width: 100%;
}

.poptop h3 {
  flex: 1;
  margin-left: $margin20;
  font: $h1 / 0.7rem '微软雅黑';
}

.specsname {
  font: bold $h1 / 0.7rem '微软雅黑';
  margin-left: $margin20;
}

.specs {
  overflow: hidden;
}

.specs span {
  float: left;
  padding: $padding10 $padding20;
  border: 1px solid $fontColor2;
  font: $h2 / 0.4rem '微软雅黑';
  margin: $margin20;
}

.specs .select {
  border-color: $primary;
  color: $primary;
}

.btn {
  position: relative;
  bottom: 0;
  width: 3rem;
  height: 0.9rem;
  margin-right: 50%;
  transform: translateX(50%);
  font: $h2 / $header '微软雅黑';
  background: $primary;
  margin-top: 20px;
}
</style>