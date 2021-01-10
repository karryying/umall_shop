<template>
  <div class="regiser">
    <div class="registerinner">
      <div class="input">
        <label for="username">手机号</label>
        <input type="text" id="phone" v-model="user.phone" />
      </div>
      <div class="input">
        <label for="nickname">昵称</label>
        <input type="text" id="nickname" v-model="user.nickname" />
      </div>
      <div class="input">
        <label for="password">密码</label>
        <input type="text" id="password" v-model="user.password" />
      </div>
      <van-button @click="register" type="primary">注册</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reqRegister } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      reqRegister(this.user).then((res) => {
        if (res.data.code === 200) {
          Toast("注册成功");
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../stylus/index.styl';

.registerinner {
  width: 90%;
  margin: 30% auto;
}
</style>