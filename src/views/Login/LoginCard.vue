<template>
  <el-card class="card-login"
    shadow="hover"
    :body-style="{padding:'50px 56px'}">
    <el-form ref="form"
      :model="user">
      <el-form-item prop="username"
        :rules="{ required: true, message: '登录名不能为空'}">
        <el-input v-model="user.username"
          type="text"
          size="large"
          placeholder="请输入用户名或邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password"
        :rules="{ required: true, message: '登录密码不能为空'}">
        <el-input v-model="user.password"
          size="large"
          type="password"
          placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <div v-loading="isLoggingIn"
        class="buttons-wrapper">
        <el-button class="btn-login"
          @click="onGuestClick">游客登录</el-button>
        <el-button class="btn-login"
          type="primary"
          @click="onLoginClick">用户登录</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
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
    reLogin() {
      console.log(this.user)
    },

    onGuestClick() {
      this.isLoggingIn = true
      this.$refs.form.clearValidate()
      this.user.username = 'Welcome To Chaos World'
      this.user.password = '全てはシュタインズゲートの选択だ'
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
