<template>
  <base-card title="密码修改"
    @back="onBack">
    <el-form :model="user"
      ref="form"
      class="form"
      hide-required-asterisk
      label-width="80px">
      <el-form-item label="当前密码"
        prop="password"
        :rules="{required: true,trigger: 'blur',message: '请输入当前密码'}">
        <el-input v-model="user.password"
          type="password"
          placeholder="请输入当前密码"></el-input>
      </el-form-item>
      <el-form-item label="修改密码"
        prop="modifyPassword"
        :rules="{min: 6,required: true,trigger: 'blur',
          message: '请输入字符长度大于 6 的密码'}">
        <el-input v-model="user.modifyPassword"
          type="password"
          placeholder="请输入修改密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
        prop="confirmPassword"
        :rules="{ validator: validatePass, trigger: 'blur' }">
        <el-input v-model="user.confirmPassword"
          type="password"
          placeholder="请再次输入修改密码"></el-input>
      </el-form-item>
      <div class="form__footer">
        <span class="form__error">{{error}}</span>
        <el-button type="primary"
          icon="el-icon-refresh"
          @click="onSubmit">修改</el-button>
      </div>
    </el-form>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard'

export default {
  name: 'PasswordCard',

  components: {
    BaseCard
  },

  data() {
    return {
      user: {
        nickname: '',
        password: '',
        modifyPassword: '',
        confirmPassword: ''
      },
      error: ''
    }
  },

  methods: {
    reSavePassword() {
      this.$callApi({
        method: 'put',
        api: 'users/update_password',
        param: this.user
      }).then(data => {
        this.$notify.success({
          title: '消息',
          message: data.message
        })
        this.onBack()
      })
    },

    validatePass(rule, value) {
      if (!value) {
        return Promise.reject('请再次输入密码')
      } else if (value !== this.user.modifyPassword) {
        return Promise.reject('两次密码输入不一致！')
      }
      return Promise.resolve()
    },

    onBack() {
      this.$emit('back')
      Object.keys(this.user).forEach(key => {
        this.user[key] = ''
      })
      this.$nextTick(this.$refs.form.clearValidate)
    },

    onSubmit() {
      this.$refs.form
        .validate()
        .then(val => {
          val && this.reSavePassword()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import './cardFormStyle.scss';
</style>
