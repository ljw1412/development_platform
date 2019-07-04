<template>
  <base-card title="修改信息"
    @back="onBack">
    <div class="info-card">
      <el-form ref="form"
        class="form"
        hide-required-asterisk
        :model="userInfo">
        <el-form-item label="昵称"
          prop="nickname"
          :rules="{required: true,trigger: 'blur',message: '请输入昵称'}">
          <el-input v-model="userInfo.nickname"
            type="text"
            placeholder="请输入昵称（最多10个字符）"
            :maxlength="10" />
        </el-form-item>
        <div class="form__footer">
          <el-button type="primary"
            @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </div>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard'
export default {
  name: 'InfoCard',

  components: {
    BaseCard
  },

  props: { user: { type: Object, default: () => ({}) } },

  data() {
    return {
      userInfo: { nickname: '' }
    }
  },

  methods: {
    reSaveUserInfo() {
      this.$callApi({
        method: 'put',
        api: 'users/update_info',
        param: this.userInfo
      }).then(data => {
        this.$notify.success({
          title: '消息',
          dangerouslyUseHTMLString: true,
          message: '用户信息更新成功！</br>(部分信息退出后重新登录才会生效)'
        })
        this.onBack()
        this.$emit('change')
      })
    },

    onBack() {
      this.$emit('back')
      this.userInfo.nickname = this.user.nickname
      this.$nextTick(this.$refs.form.clearValidate)
    },

    onSubmit() {
      this.$refs.form
        .validate()
        .then(val => {
          val && this.reSaveUserInfo()
        })
        .catch(() => {})
    }
  },

  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.userInfo.nickname = user.nickname
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './cardFormStyle.scss';
.form {
  padding: 30px;
  &__footer {
    margin-top: 80px;
  }
}
</style>
