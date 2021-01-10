<template>
  <div class="search">
    <header class="header">
      <i @click="$router.go(-1)" class="back">&lt;</i>
      <van-search id="search" @focus="focus" v-model="value" placeholder="请输入搜索关键词" />
    </header>
    <h3>热门搜索</h3>
    <div class="hotSearch">
      <ol>
        <li v-for="(item,index) in listGoods" :key="item.id">{{index+1+'、'}}{{item.goodsname}}</li>
      </ol>
    </div>
  </div>
</template>

<script>
import { reqListGoods } from "../../utils/http";
export default {
  data() {
    return {
      value: "",
      listGoods: [],
    };
  },
  mounted() {
    this.focus();
    reqListGoods().then((res) => {
      this.listGoods = res.data.list[0].content;
    });
  },
  methods: {
    focus() {
      this.$("#search").focus();
    },
  },
};
</script>

<style scoped>
.header {
  height: 0.8rem;
  display: flex;
  border-bottom: 1px solid #ccc;
}
i {
  font: 0.6rem/0.8rem "微软雅黑";
  color: #999;
  margin-left: 0.2rem;
}
.van-search {
  border-radius: 0.2rem;
  flex: 1;
}
h3 {
  margin: 20px;
}
.hotSearch {
  width: 100%;
}
.hotSearch ol {
  width: 90%;
  margin-left: 20px;
}
.hotSearch ol li {
  width: 50%;
  float: left;
  font: 15px/30px "微软雅黑";
}
</style>