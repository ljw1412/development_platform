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

    <el-table class="table"
      height="100%"
      :empty-text="isLoading?'加载中……':'该文件夹没有任何文件'"
      :data="fileList"
      :show-header="false"
      :highlight-current-row="isSelect"
      @row-click="onFileClick"
      @row-dblclick="onFileDblclick">
      <el-table-column label="名称">
        <template #default="scope">
          <div class="table__name">
            <el-image fit="contain"
              class="table__file-icon"
              :src="getFileIcon(scope.row)"></el-image>
            <span>{{scope.row.name}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    path: { type: String, default: '/' },
    onlyDir: Boolean,
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
      fileList: [],
      isLoading: false
    }
  },

  methods: {
    getFileIcon(file) {
      return require(file.type === 'dir'
        ? './images/icon-dir.svg'
        : './images/icon-unknown.svg')
    },

    concatPath(parentPath, name) {
      return parentPath + (parentPath.endsWith('/') ? name : '/' + name)
    },

    reFindFileList() {
      this.isLoading = true
      this.$callApi({
        api: 'file/list',
        param: {
          path: this.mPath,
          onlyDir: this.onlyDir
        }
      }).then(data => {
        data.forEach(item => {
          item.isSelected = false
        })
        this.fileList = data
        this.isLoading = false
      })
    },

    onNavClick(item) {
      this.mPath = item.path
      if (this.isSelect) {
        this.selectedPath = item.path
      }
    },

    onFileClick(item) {
      if (this.isSelect) {
        this.fileList.forEach(item => {
          item.isSelected = false
        })
        this.$set(item, 'isSelected', true)
        this.selectedPath = this.concatPath(this.mPath, item.name)
        return
      }

      if (item.type === 'dir') {
        this.mPath = this.concatPath(this.mPath, item.name)
      }
    },

    onFileDblclick(item) {
      if (!this.isSelect) return
      if (item.type === 'dir') {
        this.mPath = this.concatPath(this.mPath, item.name)
      }
    }
  },

  mounted() {
    this.mPath = this.path
    if (this.isSelect) this.selectedPath = this.path
    this.reFindFileList()
  },

  watch: {
    mPath(val) {
      this.fileList = []
      this.reFindFileList()
    },
    selectedPath(val) {
      this.$emit('selectChange', val)
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

  &__breadcrumb {
    flex-shrink: 0;
    padding: 10px 0;
  }

  &__breadcrumb-item:not(.isLast) {
    /deep/ .el-breadcrumb__inner {
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
    }
  }

  .table {
    user-select: none;
    &__name {
      display: flex;
      align-items: center;
    }
    &__file-icon {
      user-select: none;
      width: 20px;
      height: 20px;
      margin: 0 5px;
    }
    /deep/ .el-table__row {
      cursor: pointer;
    }
  }
}
</style>
