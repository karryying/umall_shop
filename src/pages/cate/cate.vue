<template>
  <div class="cate">
    <div class="left">
      <ul>
        <li
          @click="getChildren(index)"
          :class="index===n?'select':''"
          v-for="(item,index) in listcate"
          :key="item.id"
        >{{item.catename}}</li>
      </ul>
    </div>
    <div class="right">
      <div @click="goCateList(item.id)" class="goodsitem" v-for="item in children" :key="item.id">
        <div class="pic">
          <img :src="$pre+item.img" alt />
          <div class="mask">{{item.catename}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCate } from "../../utils/http";
export default {
  data() {
    return {
      n: 0,
      listcate: [],
      children: [],
    };
  },
  methods: {
    getChildren(index) {
      this.n = index;
      this.children = this.listcate[this.n].children;
    },
    goCateList(id) {
      this.$router.push("/catelist?id=" + id);
    },
  },
  mounted() {
    reqCate().then((res) => {
      if (res.data.code === 200) {
        this.listcate = res.data.list;
        // //给children赋值
        this.getChildren(0);
      }
    });
  },
};
</script>

<style scoped lang="stylus">
@import '../../stylus/index.styl';

.cate {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-bottom: $footer;
  background: $cateBgColor;
}

.cate .left {
  width: 2.3rem;
}

.cate .left ul {
  overflow: hidden;
}

.cate .left ul li {
  font: $h2 / 0.9rem '微软雅黑';
  text-align: center;
  border-left: 5px solid $cateBgColor;
}

.cate .left ul .select {
  border-color: $borCateColor;
  background: $selectColor;
}

.cate .right {
  flex: 1;
  overflow: hidden;
}

.goodsitem {
  margin-top: $margin20;
  float: left;
}

.cate .right .pic {
  position: relative;
  width: $imgWH;
  height: 2.3rem;
  margin-left: $margin10;
  border: 1px solid $cateGoodsBgColor;
  border-radius: 0.2rem;
  overflow: hidden;
}

.cate .right .pic img {
  width: 100%;
  height: 100%;
}

.cate .right .pic .mask {
  position: absolute;
  width: 100%;
  height: 0.5rem;
  bottom: 0;
  background: $cateGoodsBgColor;
  text-align: center;
  font: $h3 / 0.5rem '微软雅黑';
  color: $selectColor;
}
</style>