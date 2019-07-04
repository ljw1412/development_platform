<template>
  <el-dialog width="400px"
    :visible="value"
    :title="title"
    @close="$emit('input',false)">
    <el-form ref="form"
      class="form-user"
      label-position="right"
      label-width="70px"
      :model="user"
      :rules="ruleList">
      <el-form-item label="用户名"
        prop="username">
        <el-input v-model="user.username"
          placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item v-if="isAdd"
        label="密码"
        prop="password">
        <el-input v-model="user.password"
          type="password"
          show-password
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item v-else
        label="密码">
        <el-input v-model="user.password"
          type="password"
          show-password
          placeholder="如果要修改密码请填写"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
        prop="email">
        <el-input v-model="user.email"
          type="email"
          placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="权限"
        prop="role">
        <el-select v-model="user.role"
          style="width:100%;"
          placeholder="请选择权限">
          <el-option v-for="role of roleList"
            :key="role.id"
            :value="role.id"
            :label="role.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickname"
          placeholder="请输入昵称(选填)"></el-input>
      </el-form-item>
      <div align="right">
        <el-button @click="$emit('input',false)">取消</el-button>
        <el-button type="primary"
          @click="submit">保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import isEmail from 'validator/lib/isEmail'
export default {
  name: 'UserEditDialog',

  props: {
    value: Boolean,
    isAdd: Boolean,
    roleList: { type: Array, default: () => [] }
  },

  computed: {
    title() {
      return (this.isAdd ? '添加' : '修改') + '用户'
    }
  },

  data() {
    return {
      user: {
        id: '',
        username: '',
        password: '',
        email: '',
        nickname: '',
        role: ''
      },

      ruleList: {
        username: [
          {
            required: true,
            min: 6,
            message: '请输入字符长度大于 6 的用户名',
            trigger: 'change'
          }
        ],
        password: [
          {
            min: 6,
            required: true,
            message: '请输入字符长度大于 6 的密码',
            trigger: 'change'
          }
        ],
        email: [
          { required: true, validator: this.validateEmail, trigger: 'change' }
        ],
        nickname: '',
        role: [{ required: true, message: '请选择权限', trigger: 'change' }]
      }
    }
  },

  methods: {
    initUser(user) {
      Object.assign(this.user, user)
    },

    clearUser() {
      Object.keys(this.user).forEach(key => {
        this.user[key] = ''
      })
    },

    validateEmail(rule, value) {
      if (!value) return Promise.reject('请输入邮箱')
      return isEmail(value)
        ? Promise.resolve()
        : Promise.reject('邮箱格式不正确')
    },

    reSaveUser() {
      this.$callApi({
        method: 'put',
        api: 'users/update',
        param: this.user
      }).then(data => {
        this.$notify.success({
          title: '消息',
          message: data.message
        })
        this.$emit('input', false)
        this.$emit('change')
      })
    },

    submit() {
      this.$refs.form.validate().then(val => {
        val && this.reSaveUser()
      })
    }
  },

  watch: {
    value(val) {
      if (val) {
        this.$nextTick(() => {
          setTimeout(this.$refs.form.clearValidate, 0)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-user {
  padding: 0 10px;
}
</style>
