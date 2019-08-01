<template>
  <div class="create-project">
    <el-form label-position="top"
      :model="form">
      <el-form-item label="来源"
        class="create-project__origin">
        <el-radio-group v-model="form.origin"
          size="medium"
          @change="onOriginChange">
          <el-radio-button label="git"></el-radio-button>
          <el-radio-button label="custom"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="isFromGit"
        label="git仓库地址"
        prop="git"
        :rules="[ { validator: isGitUrl, trigger: 'blur' }]">
        <el-input v-model="form.git"
          clearable
          placeholder="请输入git仓库地址"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CreateProject',

  computed: {
    isFromGit() {
      return this.form.origin === 'git'
    }
  },

  data() {
    return {
      form: {
        origin: '',
        git: ''
      }
    }
  },

  methods: {
    isGitUrl(rule, url) {
      const regx = /^(git|https?).*\.git$/
      return regx.test(url)
        ? Promise.resolve()
        : Promise.reject('git 地址格式不正确')
    },

    onOriginChange(e) {
      this.form.git = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.create-project {
  width: 800px;
  margin: 0 auto;
  padding-top: 20px;
  &__origin {
    /deep/ .el-radio-group {
      display: flex;
      width: 100%;
      .el-radio-button {
        flex-grow: 1;
        width: 50%;
        span {
          width: 100%;
        }
      }
    }
  }
}
</style>