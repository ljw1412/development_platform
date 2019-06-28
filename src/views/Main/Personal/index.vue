<template>
  <div class="personal">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Personal',

  methods: {
    ...mapActions('layout', ['updateTitle'])
  },

  created() {
    this.updateTitle('个人中心')
  }
}
</script>

<style lang="scss" scoped>
</style>
