<template>
  <el-card class="card-login"
    shadow="hover"
    :body-style="{padding:'50px 56px'}">
    <el-form ref="form"
      :model="user">
      <el-form-item prop="username"
        :rules="{ required: true, message: '登录名不能为空'}">
        <el-input v-model="user.username"
          ref="username"
          type="text"
          size="large"
          placeholder="请输入用户名或邮箱"
          prefix-icon="el-icon-user"
          @keydown.native.enter="$refs.password.focus()"></el-input>
      </el-form-item>
      <el-form-item prop="password"
        :rules="{ required: true, message: '登录密码不能为空'}">
        <el-input v-model="user.password"
          ref="password"
          size="large"
          type="password"
          prefix-icon="el-icon-key"
          placeholder="请输入登录密码"
          show-password
          @keydown.native.enter="onLoginClick"></el-input>
      </el-form-item>
      <div v-loading="isLoggingIn"
        class="buttons-wrapper">
        <el-button v-if="false"
          class="btn-login"
          size="large"
          @click="onGuestClick">游客登录</el-button>
        <el-button class="btn-login"
          type="primary"
          size="large"
          @click="onLoginClick">用户登录</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({ token: state => state.user.token })
  },

  data() {
    return {
      isLoggingIn: false,
      user: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapMutations('layout', ['updateLayout']),
    reLogin() {
      this.$callApi({
        method: 'post',
        api: 'users/login',
        param: {
          username: this.user.username,
          password: this.user.password
        }
      }).then(data => {
        Store.set('user', data, new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
        Cookies.set('token', data.token, { expires: 3 })
        this.$router.replace({ name: 'main' })
      })
    },

    onGuestClick() {
      this.isLoggingIn = true
      this.$refs.form.clearValidate()
      this.user.username = 'Welcome To Chaos World'
      this.user.password = '全てはシュタインズゲートの选択だ'
      Store.set('user', {
        id: '0',
        username: '游客',
        nickname: '',
        token: 'guest'
      })
      setTimeout(() => {
        this.$router.replace({ name: 'main' })
      }, 1000)
    },

    onLoginClick() {
      this.$refs.form
        .validate()
        .then(this.reLogin)
        .catch(() => {})
    }
  },

  created() {
    if (this.token) {
      this.$router.replace({ name: 'main' })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-login {
  width: 400px;
}
.buttons-wrapper {
  display: flex;
  .btn-login {
    flex-grow: 1;
  }
}
</style>
