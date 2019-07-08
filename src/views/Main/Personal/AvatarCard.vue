<template>
  <base-card title="修改头像"
    @back="onBack">
    <el-upload v-if="!imageUrl"
      drag
      action="#"
      class="upload"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onUploadChange">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击上传，或将文件拖到此处</div>
      <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div v-else
      class="avatar-editor">
      <image-editor :image-src="imageUrl"
        @preview="onImagePreview"></image-editor>
      <el-button type="primary"
        size="mini"
        @click="imageUrl =''">重新上传</el-button>
      <img :src="previewUrl" />
    </div>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard'
import ImageEditor from '@/components/ImageEditor'
export default {
  name: 'AvatarCard',

  components: {
    BaseCard,
    ImageEditor
  },

  data() {
    return {
      imageUrl: '',
      previewUrl: ''
    }
  },

  methods: {
    onBack() {
      this.imageUrl = ''
      this.$emit('back')
    },

    onUploadChange(file) {
      console.log(file)

      this.imageUrl = URL.createObjectURL(file.raw)
    },

    onImagePreview(url) {
      console.log('image', url)
      this.previewUrl = url
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  text-align: center;
  height: calc(100% - 62px);
  /deep/ .el-upload {
    width: 100%;
    height: 100%;
  }
  /deep/ .el-upload-dragger {
    width: 100%;
    height: 100%;
    border-width: 1px 0 0 0;
    border-radius: 0;
    background-color: rgba($color: #fff, $alpha: 0.2);
    transition-duration: 0.3s;
    &.is-dragover,
    &:hover {
      border-color: #ffdd4e;
      background-color: rgba($color: #ffdd4e, $alpha: 0.4);
    }
  }
  .el-icon-upload,
  .el-upload__text,
  .el-upload__tip {
    color: #fff;
    text-shadow: 2px 2px 1px rgba($color: #000000, $alpha: 0.75);
  }
}
.avatar-editor {
  padding: 0 20px;
}
</style>
