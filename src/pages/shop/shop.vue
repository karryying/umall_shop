<template>
  <div class="cart">
    <van-empty
      v-if="cart === null"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="购物车空空如也"
    />

    <van-swipe-cell
      rigth-width="300px"
      v-else
      v-for="(item,index) in cart"
      :key="item.id"
      ref="swiper"
    >
      <van-cell class="vancell" :border="false">
        <div class="select">
          <img @click="changeStatus(item.id,index)" :src="item.checked?radio_hig:radio_nor" alt />
        </div>
        <div class="pic">
          <img @click="goDetail(item.goodsid)" :src="$pre+item.img" alt />
        </div>
        <div class="goosInfo">
          <h3 class="goodsname">{{item.goodsname}}</h3>
          <!-- 数量 -->
          <div class="num">
            <span id="sub" @click="subNum(item.id,item.num)" class="child">-</span>
            <input @input="getNum(item.id,item.num)" class="child" v-model="item.num" type="text" />
            <span @click="addNum(item.id)" class="child">+</span>
          </div>
          <!-- 总价 -->
          <p class="totalprice">总价：￥{{item.price * item.num|filterPrice}}</p>
        </div>
        <p class="price">￥{{item.price|filterPrice}}</p>
      </van-cell>
      <template #right>
        <van-button
          @click="deleteCart(item.id)"
          square
          text="删除"
          type="danger"
          class="delete-button"
        />
      </template>
      <!-- 底部 -->
    </van-swipe-cell>
    <div class="shopBottom" v-if="cart !== null">
      <div class="select">
        <img @click="changeCheckAll" :src="checkAll?radio_hig:radio_nor" alt />
        <div class="text">全选</div>
      </div>
      <div class="edit">
        <div class="bianji">
          <img @click="changeedit" :src="edit?editor_hig:editor_nor" alt />
          <div class="text">编辑</div>
        </div>
        <p class="text">
          <i>合计：￥{{allPrice|filterPrice}}</i>
          <span>(不含运费)</span>
        </p>
      </div>
      <div class="go">
        <van-button @click="goCheckOut" class="goBtn" type="primary">去结算</van-button>
      </div>
    </div>
    <div v-if="cart === null" class="shopBottom">
      <van-button @click="goShop" class="goShop" type="primary">前往购物</van-button>
    </div>
  </div>
</template>

<script>
import radio_nor from "../../assets/img/radio_nor.png";
import radio_hig from "../../assets/img/radio_hig.png";
import editor_nor from "../../assets/img/editor_nor.png";
import editor_hig from "../../assets/img/editor_hig.png";
import { getCart, goodsNumUpdate, deleteGoods } from "../../utils/http";
import { Toast, Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      cart: [],
      radio_nor,
      radio_hig,
      editor_nor,
      editor_hig,
      edit: false,
      checkAll: false,
      isReq: true,
    };
  },
  methods: {
    init() {
      //先把每一项的checked保存起来
      let arr = this.cart.map((item) => ({
        id: item.id,
        checked: item.checked,
      }));
      //初始化页面
      let uid = JSON.parse(localStorage.getItem("user")).uid;
      getCart(uid).then((res) => {
        if (res.data.code === 200) {
          this.cart = res.data.list;
          this.isReq = true;
          try {
            this.cart.forEach((item) => {
              let obj = arr.find((i) => i.id === item.id);
              item.checked = obj ? obj.checked : false;
            });
          } catch (error) {}
        }
      });
    },
    changeStatus(id, index) {
      //选中一个单选框触发的事件
      let obj = this.cart[index];
      obj.checked = !obj.checked;
      this.cart.splice(index, 1, obj);
      //判断是否所有的
      this.checkAll = this.cart.every((item) => item.checked);
    },
    subNum(id, num) {
      if (num <= 1) {
        Toast("宝贝不能再减啦");
        return;
      }
      //数量减
      if (this.isReq) {
        this.isReq = false;
        //发送请求改变数据库的商品数量
        goodsNumUpdate({ id: id, type: 1 }).then((res) => {
          if (res.data.code === 200) {
            //已经减少了，当前的这个商品数量减一
            // this.cart.forEach((item, index) => {
            //   if (item.id === id) {
            //     item--;
            //   }
            // });
            this.init();
          }
        });
      }
    },
    addNum(id) {
      //数量加
      //发送请求改变数据库的商品数量
      goodsNumUpdate({ id, type: 2 }).then((res) => {
        if (res.data.code === 200) {
          this.cart.forEach((item, index) => {
            if (item.id === id) {
              item.num++;
            }
          });
        }
      });
    },
    changeNum(id, type) {},

    //  //重新请求

    getNum(id, num) {
      if (num <= 1) {
        this.cart.forEach((item) => {
          if (item.id === id) {
            item.num = 1;
          }
        });
      }
    },
    changeedit() {
      //编辑
      if (this.cart == null) {
        Toast("先去添加购物车吧");
        return;
      }
      this.edit = !this.edit;
      if (this.edit) {
        this.$refs.swiper.forEach((item) => item.open("right"));
      }
    },
    changeCheckAll() {
      // if (this.cart == null) {
      //   Toast("先去添加购物车吧");
      //   return;
      // }
      //当点击编辑的时候未点击全选
      if (this.edit) {
        this.edit = false;
      }
      this.checkAll = !this.checkAll;
      //让所有的框都勾选上
      this.cart.map((item, index) => {
        item.checked = this.checkAll;
        this.cart.splice(index, 1, item);
      });
    },
    deleteCart(id) {
      //点击删除
      Dialog.confirm({
        message: "真的要删除吗？",
      })
        .then(() => {
          deleteGoods(id).then((res) => {
            if (res.data.code === 200) {
              Toast("删除成功");
              this.edit = false;
              this.init();
            }
          });
        })
        .catch(() => {
          //取消让编辑的edit为false
          this.edit = false;
          Toast("已取消");
        });
    },
    goShop() {
      this.$router.replace("/index/home");
    },
    goCheckOut() {
      //去结算，首先判断是否选中商品
      let flag = this.cart.some((item) => item.checked);
      if (!flag) {
        Toast("请购选商品");
        return;
      }
      this.$router.push("/order");
    },
    goDetail(id) {
      // console.log(this.cart, id);
      this.$router.push("/detail?id=" + id);
    },
  },
  mounted() {
    this.init();
  },
  computed: {
    allPrice() {
      //计算总价
      // console.log("触发了");
      // console.log(this.cart);
      if (this.cart == null) {
        return 0;
      } else {
        return this.cart.reduce(
          (total, item) =>
            item.checked ? (total += item.price * item.num) : total,
          0
        );
      }
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../stylus/index.styl';

.van-swipe-cell {
  margin-top: $margin20;
}

.van-cell__value {
  display: flex;
}

.select {
  width: 0.4rem;
  height: 0.4rem;
  align-self: center;
}

.bianji img, .select img {
  width: 0.4rem;
  height: 0.4rem;
}

.pic {
  width: 1.5rem;
  height: 1.5rem;
  padding: $padding20;
}

.pic img {
  width: 100%;
}

.goosInfo {
  flex: 1;
  margin-left: $margin10;
}

.goodsname {
  font: $shopFontSize / 0.4rem '微软雅黑';
}

.num {
  text-align: center;
  font: $h3 / 0.5rem '微软雅黑';
  overflow: hidden;
  margin: 0.3rem 0 $margin10 0;
}

.num .child {
  float: left;
  width: 0.6rem;
  height: 0.5rem;
  border: 0.01rem solid $fontColor3;
  line-height: 0.5rem;
  color: $fontColor2;
}

.num input {
  vertical-align: bottom;
  padding: 0;
  text-indent: 0;
  text-align: center;
}

.price, .totalprice {
  font: $h2 / 0.4rem '微软雅黑';
  color: $fontColor1;
}

.price {
  margin: $margin20;
}

.delete-button {
  height: 100%;
}

.shopBottom {
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: $footer;
  width: 100%;
  background: $selectColor;
  border-top: 1px solid $fontColor3;
  padding: 0;
}

.shopBottom .select {
  width: 1.5rem;
  height: 100%;
  justify-self: center;
  align-self: center;
  text-align: center;
}

.text {
  font: $h3 / 0.43rem '微软雅黑';
}

.edit {
  flex: 1;
  display: flex;
  align-items: center;
  align-self: center;
  text-align: center;
}

.edit p {
  margin-left: $margin20;
  color: $fontColor2;
}

.edit p span {
  display: block;
}

.go {
  width: 2.3rem;
}

.goBtn {
  height: 100%;
  margin: 0;
  border-radius: 0;
  font-size: $h1;
}

.goShop {
  width: 3rem;
  height: 100%;
  margin: 0;
  border-radius: 0;
}
</style>