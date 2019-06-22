<template>
  <div class="file-manager">
    <el-breadcrumb class="file-manager__breadcrumb"
      separator="/">
      <el-breadcrumb-item v-for="(item,index) of pathList"
        :key="index"
        :data-last="index === pathList.length-1"
        @click.native="onNavClick(item,$event)">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-scrollbar class="file-manager__scrollbar">
      <ul class="file-manager__file-list">
        <li v-for="(item,index) of fileList"
          :key="index"
          @click="onFileClick(item)">
          <el-image fit="contain"
            class="file-icon"
            :src="getFileIcon(item)"></el-image>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    path: { type: String, default: '/' }
  },

  computed: {
    pathList() {
      if (this.mPath === '/') {
        return [{ name: '根目录', path: '/' }]
      }
      const dirList = this.mPath.split('/')
      return dirList.map((item, index) => {
        if (!index) return { name: '根目录', path: '/' }
        return { name: item, path: dirList.slice(0, index + 1).join('/') }
      })
    }
  },

  data() {
    return {
      mPath: '/',
      fileList: []
    }
  },

  methods: {
    getFileIcon(file) {
      return require(file.type === 'dir'
        ? './images/icon-dir.svg'
        : './images/icon-unknown.svg')
    },

    reFindFileList() {
      this.$callApi({
        api: 'file/',
        param: {
          path: this.mPath
        }
      }).then(data => {
        this.fileList = data
      })
    },

    onNavClick(item, event) {
      this.mPath = item.path
    },

    onFileClick(item) {
      if (item.type === 'dir') {
        this.mPath += this.mPath.endsWith('/') ? item.name : '/' + item.name
      }
    }
  },

  mounted() {
    this.mPath = this.path
    this.reFindFileList()
  },

  watch: {
    mPath(val) {
      this.fileList = []
      this.reFindFileList()
    }
  }
}
</script>

<style lang="scss" scoped>
.file-manager {
  display: flex;
  height: 100%;
  flex-direction: column;
  /deep/ .el-breadcrumb__inner {
    cursor: pointer;
  }
  &__breadcrumb {
    flex-shrink: 0;
    margin: 10px 0;
  }
  &__scrollbar {
    flex-grow: 1;
    height: 100%;
  }
  &__file-list {
    margin-bottom: 10px;
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      .file-icon {
        user-select: none;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
}
</style>
