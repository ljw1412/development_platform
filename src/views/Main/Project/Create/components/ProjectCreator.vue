<template>
  <div class="project-creator">
    <el-form :model="project"
      ref="form"
      label-position="top"
      status-icon
      hide-required-asterisk>
      <el-form-item label="来源"
        class="project-creator__origin">
        <el-radio-group v-model="project.origin"
          size="medium"
          @change="onOriginChange">
          <el-radio-button label="git"></el-radio-button>
          <el-radio-button label="custom"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <template v-if="project.origin">
        <el-form-item v-if="isFromGit"
          label="git仓库地址"
          prop="git"
          :rules="[{ validator: isGitUrl, trigger: 'blur' }]">
          <el-input v-model="project.git"
            placeholder="请输入git仓库地址"></el-input>
        </el-form-item>
        <el-form-item label="项目名称"
          ref="projectName"
          prop="name"
          :rules="[{ required: true, message: '请输入项目名称', trigger: 'blur' }]">
          <el-input v-model="project.name"
            placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目目标文件夹"
          ref="dirPathInput"
          prop="dirPath"
          :rules="[{ validator: isExists, trigger: 'blur' }]">
          <el-input v-model="project.dirPath"
            placeholder="请输入项目目标文件夹">
            <el-button slot="append"
              type="primary"
              @click="isDisplayDrawer = true">浏览</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="项目实际路径">
          <el-input :value="finalProjectPath"
            disabled
            placeholder="自动生成"></el-input>
        </el-form-item>
        <el-form-item label="项目描述(选填)">
          <el-input v-model="project.description"
            show-word-limit
            maxlength="200"
            type="textarea"
            rows="5"
            resize="none"></el-input>
        </el-form-item>
        <div class="project-creator__actions">
          <el-button type="primary"
            :loading="isSaving"
            @click="onCreateClick">创建</el-button>
        </div>
      </template>
    </el-form>
    <!-- 文件浏览器 -->
    <el-drawer title="请选择文件夹"
      direction="rtl"
      class="file-manager-drawer"
      size="500px"
      :visible.sync="isDisplayDrawer">
      <file-manager onlyDir
        isSelect
        @selectChange="onFileManagerSelectChange"></file-manager>
      <div class="file-manager-drawer__path">{{selectedPath}}</div>
      <div class="file-manager-drawer__footer">
        <el-button size="medium"
          @click="isDisplayDrawer = false">取消</el-button>
        <el-button size="medium"
          type="primary"
          @click="onDrawerSelectClick">选择</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import FileManager from '@/components/FileManager'
export default {
  name: 'ProjectCreator',

  components: {
    FileManager
  },

  inject: ['creator'],

  computed: {
    isFromGit() {
      return this.project.origin === 'git'
    },

    finalProjectPath() {
      if (!this.project.dirPath || !this.project.name) return ''
      const path =
        this.project.dirPath +
        (this.project.dirPath.endsWith('/')
          ? this.project.name
          : '/' + this.project.name)
      return path
    }
  },

  data() {
    return {
      project: {
        origin: '',
        git: '',
        name: '',
        dirPath: '',
        description: ''
      },
      selectedPath: '',
      isDisplayDrawer: false,
      isSaving: false
    }
  },

  methods: {
    isGitUrl(rule, url) {
      const regx = /^(git|https?).*\.git$/
      if (regx.test(url)) {
        this.$refs.projectName.clearValidate()
        this.project.name = url.substr(url.lastIndexOf('/') + 1).split('.')[0]
        return this.reFindValidUrl(url)
      }
      return Promise.reject('git 地址格式不正确')
    },

    isExists(rule, path) {
      if (!path) return Promise.reject('项目目标文件夹路径不能为空')
      if (path === '/') return Promise.reject('请不要使用根目录作为目标文件夹')
      return this.reFindDirExists(path)
    },

    // git 仓库校验是否有效
    reFindValidUrl(url) {
      return this.$callApi({
        api: 'project/checkGitValid',
        param: { url }
      }).then(({ valid, out }) =>
        valid
          ? Promise.resolve('这是一个有效的仓库')
          : Promise.reject('这不是一个有效的仓库地址')
      )
    },

    // 文件夹校验是否存在
    reFindDirExists(path) {
      return this.$callApi({
        api: 'file/exists',
        param: { path }
      }).then(isExists =>
        isExists
          ? Promise.resolve('存在该文件夹')
          : Promise.reject(`不存在"${path}"路径`)
      )
    },

    reSaveProject() {
      this.isSaving = true
      this.$callApi({
        method: 'put',
        api: 'project/save',
        param: Object.assign({ path: this.finalProjectPath }, this.project)
      })
        .then(data => {
          this.isSaving = false
          this.creator.currentStep.icon = 'el-icon-circle-check'
          this.creator.activeIndex = 3
        })
        .catch(() => {
          this.isSaving = false
        })
    },

    onOriginChange(e) {
      this.project.git = ''
    },

    onFileManagerSelectChange(path) {
      this.selectedPath = path
    },

    onDrawerSelectClick() {
      this.project.dirPath = this.selectedPath
      this.isDisplayDrawer = false
      this.$refs.dirPathInput.clearValidate()
    },

    onCreateClick() {
      this.$refs.form
        .validate()
        .then(this.reSaveProject)
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.project-creator {
  @include auto-center-view(800px);
  padding: 20px 10px;
  box-sizing: border-box;
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
  &__actions {
    text-align: right;
  }
}

.file-manager-drawer {
  /deep/ .el-drawer__body {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
    padding-top: 0;
  }
  &__path {
    font-size: 12px;
    color: $--color-text-secondary;
  }
  &__footer {
    display: flex;
    margin-top: 10px;
    .el-button {
      flex-grow: 1;
      & + .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>