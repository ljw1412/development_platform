<template>
  <div id="login">
    <div class="auth-wrapper">
      <img class="logo"
        src="../../assets/logo.svg" />
      <login-card></login-card>
    </div>
  </div>
</template>

<script>
import LoginCard from './LoginCard'
export default {
  components: {
    LoginCard
  },

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background-color: #545c64;
}

.auth-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.logo {
  user-select: none;
  margin: 10px auto;
  width: 300px;
}
</style>
