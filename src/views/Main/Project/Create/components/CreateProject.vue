<template>
  <div class="create-project">
    <el-form label-position="top"
      status-icon
      :model="project">
      <el-form-item label="来源"
        class="create-project__origin">
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
          :rules="[ { validator: isGitUrl, trigger: 'blur' }]">
          <el-input v-model="project.git"
            placeholder="请输入git仓库地址"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="project.name"
            placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目目标文件夹">
          <el-input v-model="project.dirPath"
            placeholder="请输入项目目标文件夹">
            <el-button slot="append"
              type="primary"
              @click="isDisplayDrawer = true">浏览</el-button>
          </el-input>
        </el-form-item>
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
  name: 'CreateProject',

  components: {
    FileManager
  },

  computed: {
    isFromGit() {
      return this.project.origin === 'git'
    }
  },

  data() {
    return {
      project: {
        origin: '',
        git: '',
        name: '',
        dirPath: ''
      },
      selectedPath: '',
      isDisplayDrawer: false
    }
  },

  methods: {
    isGitUrl(rule, url) {
      const regx = /^(git|https?).*\.git$/
      if (regx.test(url)) {
        this.project.name = url.substr(url.lastIndexOf('/') + 1).split('.')[0]
        return this.reFindValidUrl(url)
      }
      return Promise.reject('git 地址格式不正确')
    },

    reFindValidUrl(url) {
      return this.$callApi({
        api: 'git/checkValid',
        param: { url }
      }).then(({ valid, out }) =>
        valid
          ? Promise.resolve('这是一个有效的仓库')
          : Promise.reject('这不是一个有效的仓库地址')
      )
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.create-project {
  max-width: 800px;
  width: 100%;
  padding: 20px 10px;
  margin: 0 auto;
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