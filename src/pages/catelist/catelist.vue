<template>
  <v-list class="catelist" :listGoods="list"></v-list>
</template>

<script>
import vList from "../home/components/list";
import { getCateListGoods } from "../../utils/http";
export default {
  components: {
    vList,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    //获取分类商品
    let id = this.$route.query.id;
    getCateListGoods(id).then((res) => {
      if (res.data.code === 200) {
        this.list = res.data.list;
      }
    });
  },
};
</script>

<style scoped lang="stylus">
@import '../../stylus/index.styl';

.catelist {
  padding-top: $header;
}
</style>