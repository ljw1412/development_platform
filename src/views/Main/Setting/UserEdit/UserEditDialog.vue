<template>
  <el-dialog width="400px"
    :visible="value"
    :title="title"
    @close="$emit('input',false)">
    <el-form :model="user"
      class="form-user"
      label-position="right"
      label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="user.username"
          placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"
          type="password"
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email"
          type="email"
          placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="权限"></el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickName"
          placeholder="请输入昵称(选填)"></el-input>
      </el-form-item>
      <div align="right">
        <el-button @click="$emit('input',false)">取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserEditDialog',

  props: {
    value: Boolean,
    title: String
  },

  data() {
    return {
      user: {
        id: '',
        username: '',
        password: '',
        email: '',
        nickName: '',
        role: ''
      }
    }
  },

  methods: {
    clearUser() {
      Object.keys(this.user).forEach(key => {
        this.user[key] = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-user {
  /deep/ .el-form-item__label {
    text-align-last: justify;
  }
}
</style>
