<template>
  <div class="login">
    <p>{{msg}}</p>
    <group>
      <x-input title="账号" v-model="account" :show-clear="false"></x-input>
      <x-input title="密码" type="password" v-model="password" :show-clear="false"></x-input>
    </group>
    <x-button class="button" type="primary" @click.native="loginToDo">登录</x-button>
  </div>
</template>

<script>
import Vue from 'vue';
import { Group, XButton, XInput, ToastPlugin } from 'vux';
import axios from 'axios';

Vue.use(ToastPlugin);

export default {
  name: 'login',
  components: {
    Group,
    XButton,
    XInput
  },
  data () {
    return {
      msg: '欢迎登录',
      account: '',
      password: '',
    }
  },
  methods: {
    loginToDo(){
      // this.$router.push({ path: 'todolist' });
      axios.post('/user', {
        account: this.account,
        password: this.password
      })
      .then((response) => {
        if (response.data.code) {
          sessionStorage.setItem("name", this.account);
          sessionStorage.setItem("id", response.data.data.id);
          this.$router.push({ path: 'todolist' });
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: response.data.errMsg,
            width: '10em'
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login{
  padding: 0 0.5em;
  .button{
    margin-top: 1em;
  }
}
</style>
