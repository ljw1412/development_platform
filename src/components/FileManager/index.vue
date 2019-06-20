<template>
  <div class="file-manager">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) of pathList"
        :key="index"
        @click="onNavClick(item)">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-scrollbar>
      <ul>
        <li v-for="(item,index) of fileList"
          :key="index"
          @click="onFileClick(item)">{{item.name}}</li>
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
      return this.mPath.split('/').map((item, index) => {
        if (!index) return { name: '根目录', path: '/' }
        return { name: item, path: item }
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

    onNavClick(item) {},

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
      this.reFindFileList()
    }
  }
}
</script>

<style lang="scss" scoped>
.file-manager {
  & :has(el-breadcrumb__inner) {
    cursor: pointer;
  }
}
</style>
