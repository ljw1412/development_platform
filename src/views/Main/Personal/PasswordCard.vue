<template>
  <base-card>
    <template #header>
      <div style="display:flex;align-items:center;">
        <i class="card-header-icon el-icon-arrow-left"
          @click="$emit('back')"></i>
        <span>密码修改</span>
      </div>
    </template>

    <el-form class="form"
      :model="user"
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
      <div class="form__footer">
        <span class="form__error">{{error}}</span>
        <el-button type="primary"
          icon="el-icon-refresh">修改</el-button>
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
        password: '',
        modifyPassword: '',
        confirmPassword: ''
      },
      error: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header-icon {
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
  &:hover {
    color: #ffdd4e;
  }
}

.form {
  padding: 30px;
  /deep/ .el-form-item__label {
    color: #fff;
  }
  &__error {
    color: #f56c6c;
    margin-right: 10px;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
