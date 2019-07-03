<template>
  <el-card class="password-card-wrapper"
    shadow="hover"
    :body-style="{padding:0, height:'100%'}">
    <span @click="$emit('back')">密码修改</span>
    <el-form :model="user"
      label-width="80px">
      <el-form-item label="当前密码">
        <el-input v-model="user.password"
          placeholder="请输入当前密码"></el-input>
      </el-form-item>
      <el-form-item label="修改密码">
        <el-input v-model="user.modifyPassword"
          placeholder="请输入修改密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="user.confirmPassword"
          placeholder="请再次输入修改密码"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'PasswordCard',

  data() {
    return {
      user: {
        password: '',
        modifyPassword: '',
        confirmPassword: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
