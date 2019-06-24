<template>
  <div class="file-browser">
    <file-manager></file-manager>
  </div>
</template>

<script>
import FileManager from '@/components/FileManager'

export default {
  name: 'FileBrowser',

  components: {
    FileManager
  }
}
</script>

<style lang="scss" scoped>
</style>
