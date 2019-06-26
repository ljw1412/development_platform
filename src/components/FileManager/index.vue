<template>
  <div class="file-manager"
    :class="{'file-manager--select':this.isSelect}">
    <el-breadcrumb class="file-manager__breadcrumb"
      separator="/">
      <el-breadcrumb-item v-for="(item,index) of pathList"
        :key="index"
        class="file-manager__breadcrumb-item"
        :class="{'isLast':(index === pathList.length - 1)}"
        @click.native="onNavClick(item)">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <scrollbar>
      <ul class="file-manager__file-list">
        <li v-for="(item,index) of fileList"
          :key="index"
          :class="{'isSelected': item.isSelected}"
          @click="onFileClick(item)"
          @dblclick="onFileDblclick(item)">
          <el-image fit="contain"
            class="file-icon"
            :src="getFileIcon(item)"></el-image>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    path: { type: String, default: '/' },
    isSelect: Boolean
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
      selectedPath: '',
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
        data.forEach(item => {
          item.isSelected = false
        })
        this.fileList = data
      })
    },

    onNavClick(item) {
      this.mPath = item.path
    },

    onFileClick(item) {
      if (this.isSelect) {
        this.fileList.forEach(item => {
          item.isSelected = false
        })
        this.$set(item, 'isSelected', true)
        this.selectedPath = this.mPath + item.name
        return
      }

      if (item.type === 'dir') {
        this.mPath += this.mPath.endsWith('/') ? item.name : '/' + item.name
      }
    },

    onFileDblclick(item) {
      if (!this.isSelect) return
      if (item.type === 'dir') {
        this.selectedPath = ''
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
@import '@/theme/index.scss';
.file-manager {
  display: flex;
  height: 100%;
  flex-direction: column;
  &--select {
    user-select: none;
  }
  &__breadcrumb-item:not(.isLast) {
    /deep/ .el-breadcrumb__inner {
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
    }
  }

  &__breadcrumb {
    flex-shrink: 0;
    padding: 10px 0;
  }
  &__scrollbar {
    flex-grow: 1;
    height: 100%;
  }
  &__file-list {
    margin-bottom: 10px;
    li {
      position: relative;
      display: flex;
      align-items: center;
      height: 40px;
      cursor: pointer;
      &.isSelected {
        background-color: rgba($color: $--color-primary, $alpha: 0.3);
      }
      &:not(.isSelected):hover {
        background-color: rgba($color: $--color-primary, $alpha: 0.1);
      }
      .file-icon {
        user-select: none;
        width: 20px;
        height: 20px;
        margin: 0 5px;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
