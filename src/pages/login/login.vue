<template>
  <div class="login">
    <div class="logininner">
      <div class="input">
        <label for="phone">账号</label>
        <input type="text" id="phone" v-model="user.phone" />
      </div>
      <div class="input">
        <label for="password">密码</label>
        <input type="text" id="password" v-model="user.password" />
      </div>
      <div class="forget">
        <a href="#">忘记密码</a>
      </div>
      <van-button @click="login" type="primary">登录</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reqLogin } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          Toast("登录成功");
          localStorage.setItem("isLogin", 1);
          localStorage.setItem("user", JSON.stringify(res.data.list));
          this.$router.replace("/index/home");
        }
      });
    },
  },
};
</script> 


<style scoped lang="stylus">
@import '../../stylus/index.styl';

.logininner {
  width: 90%;
  margin: 30% auto;
}

.forget {
  text-align: right;
}

.forget a {
  font: $h3 / $header '微软雅黑';
  color: $fontColor2;
}

.van-button--primary {
  margin-top: 0;
}
</style>