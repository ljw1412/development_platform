<template>
  <div class="user-edit">
    用户设置
    <file-manager></file-manager>
  </div>
</template>

<script>
import FileManager from '@/components/FileManager'
export default {
  name: 'UserEdit',

  components: {
    FileManager
  }
}
</script>

<style lang="scss" scoped>
</style>
